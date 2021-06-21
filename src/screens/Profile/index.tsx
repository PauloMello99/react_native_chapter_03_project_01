import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import BrandSvg from '../../assets/brand.svg';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    SignOutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

const schema = Yup.object().shape({
    driverLicense: Yup.string().required('CNH é obrigatório'),
    // email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
});

type Option = 'dataEdit' | 'passwordEdit';

export function Profile() {
    const netinfo = useNetInfo();
    const { user, signOut, updateUser } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    const [option, setOption] = useState<Option>('dataEdit');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    function handleBack() {
        navigation.goBack();
    }

    function handlePasswordVisibilityChange() {
        setPasswordVisible((v) => !v);
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    function handleChangeOption(option: Option) {
        if (!netinfo.isConnected && option === 'passwordEdit') {
            Alert.alert(
                'Conexão',
                'Verifique se possui conexão com a internet para alterar a senha'
            );
        } else {
            setOption(option);
        }
    }

    async function handleProfileUpdate() {
        try {
            const data = { name, driverLicense };
            await schema.validate(data);
            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                token: user.token,
                name,
                avatar,
                driver_license: driverLicense,
            });
            Alert.alert('Perfil', 'dados salvos com sucesso!');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Perfil', error.message);
            }

            Alert.alert('Perfil', 'Não foi possível atualizar o perfil');
        }
    }

    function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Lembre-se que se você sair, irá precisar de internet para conectar-se novamente.',
            [
                { text: 'Cancelar', onPress: () => {} },
                { text: 'Sair', onPress: signOut },
            ]
        );
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <SignOutButton onPress={handleSignOut}>
                                <Feather name="power" size={24} color={theme.colors.shape} />
                            </SignOutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {avatar ? (
                                <Photo source={{ uri: avatar }} />
                            ) : (
                                <BrandSvg width={120} height={120} />
                            )}
                            <PhotoButton onPress={handleAvatarSelect}>
                                <Feather name="camera" size={24} color={theme.colors.shape} />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleChangeOption('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleChangeOption('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {option === 'dataEdit' ? (
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />
                                <Input
                                    iconName="mail"
                                    placeholder="Email"
                                    editable={false}
                                    defaultValue={user.email}
                                />
                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
                                />
                            </Section>
                        ) : (
                            <Section>
                                <Input
                                    iconName="lock"
                                    placeholder="Senha atual"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                                <Input
                                    iconName="lock"
                                    placeholder="Senha nova"
                                    actionIconName={isPasswordVisible ? 'eye-off' : 'eye'}
                                    secureTextEntry={!isPasswordVisible}
                                    onActionPress={handlePasswordVisibilityChange}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                                <Input
                                    iconName="lock"
                                    placeholder="Confirmar senha nova"
                                    actionIconName={isPasswordVisible ? 'eye-off' : 'eye'}
                                    secureTextEntry={!isPasswordVisible}
                                    onActionPress={handlePasswordVisibilityChange}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </Section>
                        )}
                        <Button title="Salvar alterações" onPress={handleProfileUpdate} />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
