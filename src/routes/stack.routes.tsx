import React from 'react';

import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator headerMode="none" initialRouteName="Splash">
            <Screen component={Splash} name="Splash" />
            <Screen component={Home} name="Home" options={{ gestureEnabled: false }} />
            <Screen component={MyCars} name="MyCars" />
            <Screen component={CarDetails} name="CarDetails" />
            <Screen component={Scheduling} name="Scheduling" />
            <Screen component={SchedulingDetails} name="SchedulingDetails" />
            <Screen component={SchedulingComplete} name="SchedulingComplete" />
        </Navigator>
    );
}
