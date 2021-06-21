import { TextInput as Input } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    flex-direction: row;
    margin: 4px 0;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    ${({ theme, isFocused }) =>
        isFocused &&
        css`
            border-bottom-width: 1px;
            border-bottom-color: ${theme.colors.main};
        `}
`;

export const IconContainer = styled.View`
    width: 54px;
    height: 54px;
    align-items: center;
    justify-content: center;
`;

export const TextInput = styled(Input)`
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(16)}px;
    padding: 0 16px;
    border-left-width: 1px;
    border-left-color: ${({ theme }) => theme.colors.line};
`;
