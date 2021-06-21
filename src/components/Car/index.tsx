import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as CarModel } from '../../database/model/Car';
import { useNetInfo } from '@react-native-community/netinfo';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';

interface CarProps extends RectButtonProps {
    data: CarModel;
}

export function Car({ data, ...rest }: CarProps) {
    const netinfo = useNetInfo();

    const MotorIcon = getAccessoryIcon(data.fuel_type);

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>R$ {netinfo.isConnected ? data.price : '...'}</Price>
                    </Rent>
                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>
            <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
        </Container>
    );
}
