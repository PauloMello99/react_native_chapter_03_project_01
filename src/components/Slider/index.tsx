import React, { useState, useRef, useMemo } from 'react';
import { ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import { Container, ImageIndexes, CarImageWrapper, CarImage, ImageList } from './styles';

export interface Slide {
    id: string;
    photo: string;
}

interface SliderProps {
    imagesUrl: Slide[];
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
                <Bullet key={String(index)} active={imageIndex === index} />
            )),
        [imageIndex, imagesUrl]
    );

    function renderImage({ item }: { item: Slide }) {
        return (
            <CarImageWrapper>
                <CarImage source={{ uri: item.photo }} resizeMode="contain" />
            </CarImageWrapper>
        );
    }

    function keyExtractor(item: Slide) {
        return item.id;
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
