import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from './app.stack.routes';

import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_detail,
                showLabel: false,
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    backgroundColor: theme.colors.background_primary,
                },
            }}
        >
            <Screen
                component={AppStackRoutes}
                name="Home"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HomeSvg width={size} height={size} fill={color} />
                    ),
                }}
            />
            <Screen
                component={MyCars}
                name="MyCars"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CarSvg width={size} height={size} fill={color} />
                    ),
                }}
            />
            <Screen
                component={Profile}
                name="Profile"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <PeopleSvg width={size} height={size} fill={color} />
                    ),
                }}
            />
        </Navigator>
    );
}
