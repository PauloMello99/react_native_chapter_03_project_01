import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

// import { PanGestureHandler } from 'react-native-gesture-handler';
// import { useTheme } from 'styled-components';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, {
//     useAnimatedStyle,
//     useSharedValue,
//     useAnimatedGestureHandler,
//     withSpring,
// } from 'react-native-reanimated';

import { database } from '../../database';
import { Car as CarModel } from '../../database/model/Car';
import { api } from '../../services/api';

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
    // MyCarsButton,
} from './styles';

// const AnimatedCarsButton = Animated.createAnimatedComponent(MyCarsButton);

export function Home() {
    // const theme = useTheme();
    const netinfo = useNetInfo();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState<CarModel[]>([]);

    // const positionX = useSharedValue(0);
    // const positionY = useSharedValue(0);
    // const myCarsButtonStyle = useAnimatedStyle(() => ({
    //     transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    // }));
    // const onGestureEvent = useAnimatedGestureHandler({
    //     onStart(_, ctx: any) {
    //         ctx.positionX = positionX.value;
    //         ctx.positionY = positionY.value;
    //     },
    //     onActive(event, ctx: any) {
    //         positionX.value = ctx.positionX + event.translationX;
    //         positionY.value = ctx.positionY + event.translationY;
    //     },
    //     onEnd() {
    //         positionX.value = withSpring(0);
    //         positionY.value = withSpring(0);
    //     },
    // });

    function handleDetails(item: CarModel) {
        navigation.navigate('CarDetails', { car: item });
    }

    function renderCar({ item }: { item: CarModel }) {
        return <Car data={item} onPress={() => handleDetails(item)} />;
    }

    // function handleMyCars() {
    //     navigation.navigate('MyCars');
    // }

    async function offlineSync() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const { data } = await api.get(
                    `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
                );
                const { changes, latestVersion: timestamp } = data;
                return { changes, timestamp };
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                await api.post('users/sync', user).catch(console.log);
            },
        });
    }

    useEffect(() => {
        let isMonted = true;
        async function fetchCars() {
            try {
                const carsCollection = database.get<CarModel>('cars');
                const cars = await carsCollection.query().fetch();

                if (isMonted) {
                    setCars(cars);
                }
            } catch (error) {
            } finally {
                if (isMonted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();

        return () => {
            isMonted = false;
        };
    }, []);

    useEffect(() => {
        if (netinfo.isConnected) {
            offlineSync();
        }
    }, [netinfo.isConnected]);

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
            {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[myCarsButtonStyle, { position: 'absolute', right: 16, bottom: 16 }]}
                >
                    <AnimatedCarsButton onPress={handleMyCars}>
                        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
                    </AnimatedCarsButton>
                </Animated.View>
            </PanGestureHandler> */}
        </Container>
    );
}
