import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
    color?: string;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;
    padding: 18px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, color }) => color || theme.colors.main};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
`;
