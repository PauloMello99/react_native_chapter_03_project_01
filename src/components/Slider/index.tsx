import React, { useState, useRef, useMemo } from 'react';
import { ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
    ImageList,
} from './styles';

interface SliderProps {
    imagesUrl: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function Slider({ imagesUrl }: SliderProps) {
    const [imageIndex, setImageIndex] = useState(0);

    const handleIndexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    });

    const dots = useMemo(
        () =>
            imagesUrl.map((_, index) => (
                <ImageIndex key={String(index)} active={imageIndex === index} />
            )),
        [imageIndex]
    );

    function renderImage({ item }: { item: string }) {
        return (
            <CarImageWrapper>
                <CarImage source={{ uri: item }} resizeMode="contain" />
            </CarImageWrapper>
        );
    }

    function keyExtractor(key: string) {
        return key;
    }

    return (
        <Container>
            <ImageIndexes>{dots}</ImageIndexes>
            <ImageList
                data={imagesUrl}
                renderItem={renderImage}
                keyExtractor={keyExtractor}
                onViewableItemsChanged={handleIndexChanged.current}
            />
        </Container>
    );
}
