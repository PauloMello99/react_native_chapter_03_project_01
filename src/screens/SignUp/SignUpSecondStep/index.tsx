import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { api } from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    };
}

export function SignUpSecondStep() {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params as Params;

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    function handleBack() {
        navigation.goBack();
    }

    function handlePasswordVisibilityChange() {
        setPasswordVisible((v) => !v);
    }

    async function handleRegister() {
        try {
            if (!password || !confirmPassword) {
                return Alert.alert('Confirmação de senha', 'Informe uma senha e a confirme');
            }
            if (password !== confirmPassword) {
                return Alert.alert('Confirmação de senha', 'As senha diferem');
            }
            setLoading(true);
            await api.post('/users', {
                name: user.name,
                email: user.email,
                driver_license: user.driverLicense,
                password,
            });

            navigation.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada!',
                message: `Agora é só fazer login\n e aproveitar!`,
            });
        } catch (error) {
            setLoading(false);

            Alert.alert('Criação de conta', 'Não foi possível cadastrar a conta, tente novamente');
        }
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>
                    </Header>
                    <Title>
                        Crie {`\n`}
                        sua conta
                    </Title>
                    <Subtitle>
                        Faça cadastro de {`\n`}
                        forma simples e fácil
                    </Subtitle>
                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <Input
                            iconName="lock"
                            placeholder="Senha"
                            actionIconName={isPasswordVisible ? 'eye-off' : 'eye'}
                            secureTextEntry={!isPasswordVisible}
                            onActionPress={handlePasswordVisibilityChange}
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Input
                            iconName="lock"
                            placeholder="Confirme a Senha"
                            actionIconName={isPasswordVisible ? 'eye-off' : 'eye'}
                            secureTextEntry={!isPasswordVisible}
                            onActionPress={handlePasswordVisibilityChange}
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </Form>
                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                        loading={loading}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
