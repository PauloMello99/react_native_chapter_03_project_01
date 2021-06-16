import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';

export function SchedulingComplete() {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    function handleConfirm() {
        navigation.navigate('Home');
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg />
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisa ir {`\n`}
                    até a concessionária da RENTX {`\n`}
                    para pegar seu automóvel
                </Message>
                <Footer>
                    <ConfirmButton title="Ok" onPress={handleConfirm} />
                </Footer>
            </Content>
        </Container>
    );
}
