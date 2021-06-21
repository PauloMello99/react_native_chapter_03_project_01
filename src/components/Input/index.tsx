import React, { useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, TextInput } from './styles';
import { useEffect } from 'react';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    actionIconName?: React.ComponentProps<typeof Feather>['name'];
    onActionPress?: () => void;
}

export function Input({ iconName, actionIconName, onActionPress, value, ...rest }: InputProps) {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container isFocused={isFocused}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>
            <TextInput onFocus={handleFocus} onBlur={handleBlur} {...rest} />
            {actionIconName && onActionPress && (
                <IconContainer>
                    <BorderlessButton onPress={onActionPress}>
                        <Feather name={actionIconName} size={24} color={theme.colors.text_detail} />
                    </BorderlessButton>
                </IconContainer>
            )}
        </Container>
    );
}
