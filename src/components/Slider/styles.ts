import styled from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Slide } from '.';

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: 132px;
    align-items: center;
    justify-content: center;
`;

export const CarImage = styled(FastImage)`
    width: 280px;
    height: 132px;
`;

export const ImageList = styled(FlatList as new () => FlatList<Slide>).attrs({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
})``;
