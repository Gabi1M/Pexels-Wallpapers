import React from "react"
import { StyleSheet, View } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"

import { borderRadius, imageHeight, imageWidth, Photo } from "./types"

type Props = {
    item: Photo;
    index: number;
    scrollX: SharedValue<number>;
}

export const PhotoItem = ({ item, index, scrollX }: Props) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: interpolate(scrollX.value, [index - 1, index, index + 1], [1.6, 1, 1.6])
            }, {
                rotate: `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 0, -15])}deg`
            }]
        }
    })

    return (
        <View style={[styles.root, animatedStyle]}>
            <Animated.Image
                style={[animatedStyle, styles.image]}
                source={{ uri: item.src.large }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: borderRadius,
        overflow: 'hidden',
    },
    image: {
        flex: 1
    }
})