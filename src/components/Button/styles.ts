import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
    color?: string;
}

interface ButtonTextProps {
    light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;
    margin: 8px 0;
    padding: 18px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, color }) => color || theme.colors.main};
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme, light }) => (light ? theme.colors.header : theme.colors.shape)};
    font-size: ${RFValue(16)}px;
`;
