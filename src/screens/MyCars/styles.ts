import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarProps } from '.';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_primary};
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
    font-size: ${RFValue(28)}px;
    margin-top: 24px;
`;

export const Subtitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(16)}px;
    margin-top: 24px;
`;

export const Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 24px;
`;

export const Appointments = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
`;

export const AppointmentTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(16)}px;
`;

export const AppointmentQuantity = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(16)}px;
`;

export const CarList = styled(FlatList as new () => FlatList<CarProps>).attrs({
    showsVerticalScrollIndicator: false,
})``;

export const EmptyListMessage = styled.Text`
    width: 100%;
    text-align: center;
    margin-top: 80px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(16)}px;
`;

export const CarWrapper = styled.View`
    margin-bottom: 16px;
`;

export const CarFooter = styled.View`
    width: 100%;
    padding: 12px;
    margin-top: -12px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text_detail};
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(12)}px;
`;

export const CarFooterPeriod = styled.View`
    flex-direction: row;
`;

export const CarFooterDate = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(14)}px;
`;
