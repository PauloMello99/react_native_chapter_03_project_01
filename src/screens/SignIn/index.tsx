import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Header, Subtitle, Title, Form, Footer } from './styles';

const schema = Yup.object().shape({
    password: Yup.string().required('Senha é obrigatória'),
    email: Yup.string().required('Email é obrigatório').email('Digite um email válido'),
});

export function SignIn() {
    const navigation = useNavigation();
    const theme = useTheme();
    const { signIn } = useAuth();

    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handlePasswordVisibilityChange() {
        setPasswordVisible((v) => !v);
    }

    async function handleSignIn() {
        try {
            setLoading(true);
            await schema.validate({ email, password });

            await signIn({ email, password });
        } catch (error) {
            setLoading(false);
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Login', error.message);
            }
            Alert.alert(
                'Login',
                'Falha ao fazer login, verifique as credenciais e tente novamente'
            );
        }
    }

    function handleCreateAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                    <Header>
                        <Title>
                            Estamos {`\n`}
                            quase lá.
                        </Title>
                        <Subtitle>
                            Faça login para começar {`\n`}
                            uma experiência incrível
                        </Subtitle>
                        <Form>
                            <Input
                                iconName="mail"
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
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
                        </Form>
                        <Footer>
                            <Button title="Login" onPress={handleSignIn} loading={loading} />
                            <Button
                                title="Criar conta gratuita"
                                onPress={handleCreateAccount}
                                color={theme.colors.background_secondary}
                                light
                            />
                        </Footer>
                    </Header>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
