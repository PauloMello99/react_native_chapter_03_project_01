import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(42)}px;
    color: ${({ theme }) => theme.colors.title};
    margin-top: 60px;
`;

export const Subtitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue(24)}px;
    margin-top: 16px;
`;

export const Form = styled.View`
    width: 100%;
    margin: 64px 0px 16px;
`;

export const FormTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.title};
    line-height: ${RFValue(24)}px;
    margin-bottom: 24px;
`;
