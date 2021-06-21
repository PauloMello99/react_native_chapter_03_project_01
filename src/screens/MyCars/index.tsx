import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { BackButton } from '../../components/BackButton';

import { api } from '../../services/api';
import { Car as CarModel } from '../../database/model/Car';

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
    car: CarModel;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const navigation = useNavigation();
    const theme = useTheme();
    const isScreenFocused = useIsFocused();

    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    function renderCar({ item }: { item: CarProps }) {
        const formattedStartDate = format(parseISO(item.start_date), 'dd/MM/yyyy');
        const formattedEndDate = format(parseISO(item.end_date), 'dd/MM/yyyy');

        return (
            <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                        <CarFooterDate>{formattedStartDate}</CarFooterDate>
                        <AntDesign
                            name="arrowright"
                            size={20}
                            color={theme.colors.title}
                            style={{ marginHorizontal: 12 }}
                        />
                        <CarFooterDate>{formattedEndDate}</CarFooterDate>
                    </CarFooterPeriod>
                </CarFooter>
            </CarWrapper>
        );
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const { data } = await api.get('/rentals');
                setCars(data);
            } catch (error) {
                Alert.alert('Meus carros', 'Falha ao carregar dados, tente novamente');
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, [isScreenFocused]);

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
