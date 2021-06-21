import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
    const navigation = useNavigation();
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => ({
        opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
        transform: [
            {
                translateX: interpolate(
                    splashAnimation.value,
                    [0, 50],
                    [0, -200],
                    Extrapolate.CLAMP
                ),
            },
        ],
    }));

    const logoStyle = useAnimatedStyle(() => ({
        opacity: interpolate(splashAnimation.value, [0, 50], [0, 1], Extrapolate.CLAMP),
        transform: [
            {
                translateX: interpolate(
                    splashAnimation.value,
                    [0, 50],
                    [-200, 0],
                    Extrapolate.CLAMP
                ),
            },
        ],
    }));

    function startApp() {
        navigation.navigate('SignIn');
    }

    useEffect(() => {
        splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
            runOnJS(startApp)();
        });
    }, []);

    return (
        <Container>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>
            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}
