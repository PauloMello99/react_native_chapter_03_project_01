import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';
import { Car as CarModel } from '../../database/model/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo,
} from './styles';

interface Params {
    car: CarModel;
}

export function CarDetails() {
    const netinfo = useNetInfo();
    const navigation = useNavigation();
    const route = useRoute();

    const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const headerStyleAnimation = useAnimatedStyle(() => ({
        height: interpolate(scrollY.value, [0, 200], [200, 85], Extrapolate.CLAMP),
    }));

    const sliderStyleAnimation = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    }));

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
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
            <Animated.View style={[headerStyleAnimation]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderStyleAnimation}>
                    <CarImages>
                        <Slider
                            imagesUrl={
                                !!updatedCar.photos
                                    ? updatedCar.photos
                                    : [{ id: car.thumbnail, photo: car.thumbnail }]
                            }
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={{ padding: 24, paddingTop: getStatusBarHeight() }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netinfo.isConnected ? car.price : '...'}</Price>
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
                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                {netinfo.isConnected ? (
                    <Button title="Escolher período de aluguel" onPress={handleConfirmRental} />
                ) : (
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro
                    </OfflineInfo>
                )}
            </Footer>
        </Container>
    );
}
