import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';

interface ImageIndexProps {
    active: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
    height: 6px;
    width: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => (active ? theme.colors.main : theme.colors.text)};
`;

export const CarImageWrapper = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: 132px;
    align-items: center;
    justify-content: center;
`;

export const CarImage = styled.Image`
    width: 280px;
    height: 132px;
`;

export const ImageList = styled(FlatList as new () => FlatList<string>).attrs({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
})``;
