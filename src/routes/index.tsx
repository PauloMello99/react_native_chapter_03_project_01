import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { Load } from '../components/Load';

export function Routes() {
    const { loading, user } = useAuth();

    if (loading) {
        return <Load />;
    }

    return <NavigationContainer>{user.id ? <AppTabRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
