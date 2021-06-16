import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { BackButton } from '../../components/BackButton';

import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentTitle,
    AppointmentQuantity,
    CarList,
    EmptyListMessage,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

export interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const navigation = useNavigation();
    const theme = useTheme();
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    function renderCar({ item }: { item: CarProps }) {
        return (
            <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign
                            name="arrowright"
                            size={20}
                            color={theme.colors.title}
                            style={{ marginHorizontal: 12 }}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                </CarFooter>
            </CarWrapper>
        );
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function getCars() {
            try {
                const { data: cars } = await api.get<CarProps[]>('schedules_byuser?user_id=1');
                setCars(cars);
            } catch (error) {
                Alert.alert('Meus carros', 'Falha ao carregar dados, tente novamente');
            } finally {
                setLoading(false);
            }
        }

        getCars();
    }, []);

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <Title>
                    Escolha uma {`\n`}data de início e {`\n`}fim do aluguel
                </Title>
                <Subtitle>Conforto, segurança e praticidade</Subtitle>
            </Header>
            <Content>
                <Appointments>
                    <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
                    <AppointmentQuantity>{cars.length}</AppointmentQuantity>
                </Appointments>
                {loading ? (
                    <Load />
                ) : (
                    <CarList
                        data={cars}
                        renderItem={renderCar}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <EmptyListMessage>Nenhum carro agendado no momento!</EmptyListMessage>
                        }
                    />
                )}
            </Content>
        </Container>
    );
}
