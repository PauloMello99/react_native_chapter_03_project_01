import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';

const schema = Yup.object().shape({
    driverLicense: Yup.string().required('CNH é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
});

export function SignUpFirstStep() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    function handleBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const user = { name, email, driverLicense };
            await schema.validate(user);
            navigation.navigate('SignUpSecondStep', { user });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Cadastro', error.message);
            }
            Alert.alert('Cadastro', 'Falha ao completar o cadastro, tente novamente');
        }
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            value={name}
                            autoCorrect={false}
                            autoCapitalize="sentences"
                            onChangeText={setName}
                        />
                        <Input
                            iconName="mail"
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            value={driverLicense}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setDriverLicense}
                        />
                    </Form>
                    <Button title="Próximo" onPress={handleNextStep} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
