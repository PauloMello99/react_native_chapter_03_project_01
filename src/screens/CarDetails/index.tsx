import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { CarDTO } from '../../dtos/carDTO';
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
} from './styles';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigation = useNavigation();
    const route = useRoute();
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

    return (
        <Container>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <Animated.View style={[headerStyleAnimation]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderStyleAnimation}>
                    <CarImages>
                        <Slider imagesUrl={car.photos} />
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
                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button title="Escolher período de aluguel" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}
