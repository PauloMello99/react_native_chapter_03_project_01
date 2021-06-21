import React, { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface BulletProps {
    active?: boolean;
}

export function Bullet({ active = false }: BulletProps) {
    return <Container active={active} />;
}
