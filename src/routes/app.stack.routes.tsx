import React from 'react';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
    return (
        <Navigator headerMode="none" initialRouteName="Home">
            <Screen component={Home} name="Home" />
            <Screen component={MyCars} name="MyCars" />
            <Screen component={CarDetails} name="CarDetails" />
            <Screen component={Scheduling} name="Scheduling" />
            <Screen component={SchedulingDetails} name="SchedulingDetails" />
            <Screen component={Confirmation} name="Confirmation" />
        </Navigator>
    );
}
