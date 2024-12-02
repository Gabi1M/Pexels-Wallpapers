import React from "react"
import { StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Animated, { FadeInDown, FadeOutDown, useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated"
import { MaterialCommunityIcons } from "expo-vector-icons"

type Props = {
    draftQuery: string
    setDraftQuery: (query: string) => void
    onSearch: () => void
}

export const SearchBar = ({ draftQuery, setDraftQuery, onSearch }: Props) => {
    const keyboardInfo = useAnimatedKeyboard();
    const keyboardStyle = useAnimatedStyle(() => ({
        bottom: keyboardInfo.height.value + 40
    }))

    return (
        <Animated.View
            entering={FadeInDown.springify().damping(80).stiffness(200)}
            exiting={FadeOutDown.springify().damping(80).stiffness(200)}
            style={[styles.searchContainer, keyboardStyle]}
        >
            <TextInput
                placeholder="Search wallpapers"
                value={draftQuery}
                onChangeText={setDraftQuery}
                style={styles.textInput}
                placeholderTextColor='gray'
            />
            <TouchableOpacity onPress={onSearch}>
                <MaterialCommunityIcons name="magnify" size={24} color="black" />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
        backgroundColor: 'aqua',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        position: 'absolute',
        width: '80%',
        bottom: 40,
        zIndex: 100
    },
    textInput: {
        color: 'black',
        flex: 1
    },
})