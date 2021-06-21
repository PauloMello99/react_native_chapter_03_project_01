import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
    dates: string[];
}

export function SchedulingDetails() {
    const netinfo = useNetInfo();
    const { user } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const [saving, setSaving] = useState(false);
    const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);

    const { car, dates } = route.params as Params;

    const rentalPeriod = useMemo<RentalPeriod>(
        () => ({
            startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        }),
        []
    );

    const rentTotal = useMemo(() => Number(dates.length * car.price), []);

    async function handleConfirmRental() {
        try {
            setSaving(true);

            await api.post('rentals', {
                car_id: car.id,
                user_id: user.user_id,
                start_date: new Date(dates[0]),
                end_date: new Date(dates[dates.length - 1]),
                total: rentTotal,
            });

            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npara pegar seu automóvel `,
            });
        } catch (error) {
            Alert.alert('Aluguel', 'Ocorreu um erro ao alugar o carro, tente novamente!');
            console.log(error);
        } finally {
            setSaving(false);
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchUpdatedCar() {
            const { data } = await api.get(`cars/${car.id}`);
            setUpdatedCar(data);
        }

        if (netinfo.isConnected) {
            fetchUpdatedCar();
        }
    }, [netinfo.isConnected]);

    return (
        <Container>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
            <CarImages>
                <Slider
                    imagesUrl={
                        !!updatedCar.photos
                            ? updatedCar.photos
                            : [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                {updatedCar.accessories && (
                    <Accessories>
                        {updatedCar.accessories.map((accessory) => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                )}

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.shape} />
                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar agora"
                    loading={saving}
                    onPress={handleConfirmRental}
                    color={theme.colors.success}
                />
            </Footer>
        </Container>
    );
}
