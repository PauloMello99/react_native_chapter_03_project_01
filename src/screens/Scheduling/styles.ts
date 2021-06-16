import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateValueProps {
    selected: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(325)}px;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: center;
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 18}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(32)}px;
    margin-top: 24px;
`;

export const RentalPeriod = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: ${RFValue(32)}px 0;
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(12)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(16)}px;

    ${({ selected, theme }) =>
        !selected &&
        css`
            border-bottom-width: 1px;
            border-bottom-color: ${theme.colors.text};
            padding-bottom: 4px;
        `};
`;

export const Content = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 24px 24px ${getBottomSpace() + 24}px;
`;
