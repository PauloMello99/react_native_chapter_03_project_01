import React, { useState, useEffect } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    EmptyListMessage,
    MyCarsButton,
} from './styles';

const AnimatedCarsButton = Animated.createAnimatedComponent(MyCarsButton);

export function Home() {
    const theme = useTheme();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState<CarDTO[]>([]);

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const myCarsButtonStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    }));
    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    function renderCar({ item }: { item: CarDTO }) {
        const handleDetails = () => navigation.navigate('CarDetails', { car: item });
        return <Car data={item} onPress={handleDetails} />;
    }

    function handleMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function getCars() {
            try {
                const response = await api.get<CarDTO[]>('/cars');
                setCars(response.data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        getCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, []);

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
                </HeaderContent>
            </Header>

            {loading ? (
                <Load />
            ) : (
                <CarList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCar}
                    ListEmptyComponent={
                        <EmptyListMessage>Nenhum carro disponível no momento!</EmptyListMessage>
                    }
                />
            )}
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[myCarsButtonStyle, { position: 'absolute', right: 16, bottom: 16 }]}
                >
                    <AnimatedCarsButton onPress={handleMyCars}>
                        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
                    </AnimatedCarsButton>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}
