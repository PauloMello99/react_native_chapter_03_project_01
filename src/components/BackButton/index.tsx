import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { Container } from './styles';

interface BackButtonProps extends BorderlessButtonProps {
    color?: string;
}

export function BackButton({ color, ...rest }: BackButtonProps) {
    const theme = useTheme();
    return (
        <Container {...rest}>
            <MaterialIcons name="chevron-left" size={24} color={color || theme.colors.text} />
        </Container>
    );
}
