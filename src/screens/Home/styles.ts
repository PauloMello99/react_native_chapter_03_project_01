import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import { CarDTO } from '../../dtos/carDTO';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;
    padding: 32px 24px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    contentContainerStyle: { padding: 24 },
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

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.main};
    align-items: center;
    justify-content: center;
    border-radius: 30px;
`;
