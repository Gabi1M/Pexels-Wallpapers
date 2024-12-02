import React from "react"
import { StyleSheet } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"

import { Photo } from "./types"

type Props = {
    photo: Photo;
    index: number;
    scrollX: SharedValue<number>;
}

export const BackdropPhoto = ({ photo, index, scrollX }: Props) => {
    const styles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
        }
    })

    return <Animated.Image blurRadius={10} source={{ uri: photo.src.large }} style={[styles, StyleSheet.absoluteFillObject]} />
}