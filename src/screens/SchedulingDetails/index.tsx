import React, { useMemo, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
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
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const [saving, setSaving] = useState(false);

    const { car, dates } = route.params as Params;

    const rentalPeriod = useMemo<RentalPeriod>(
        () => ({
            startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        }),
        []
    );

    const rentTotal = useMemo(() => Number(dates.length * car.rent.price), []);

    async function handleConfirmRental() {
        try {
            setSaving(true);
            const { data: schedulesByCar } = await api.get(`schedules_bycars/${car.id}`);
            const unavailable_dates = [...schedulesByCar.unavailable_dates, ...dates];

            await api.post('schedules_byuser', {
                user_id: 1,
                car,
                startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
                endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
            });
            await api.put(`schedules_bycars/${car.id}`, { id: car.id, unavailable_dates });

            navigation.navigate('SchedulingComplete');
        } catch (error) {
            console.log(error);

            Alert.alert('Aluguel', 'Ocorreu um erro ao alugar o carro, tente novamente!');
        } finally {
            setSaving(false);
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
            <CarImages>
                <Slider imagesUrl={car.photos} />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {car.accessories.map((accessory) => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

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
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
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
