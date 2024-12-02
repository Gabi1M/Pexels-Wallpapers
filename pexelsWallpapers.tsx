import React from "react"
import { ActivityIndicator, Keyboard, StyleSheet, View } from "react-native"
import Animated, { FadeInDown, FadeOutDown, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { useQuery } from "@tanstack/react-query"

import { imageWidth, SearchPayload, spacing, width } from "./types"
import { BackdropPhoto } from "./photoBackdrop"
import { PhotoItem } from "./photoItem"
import { SearchBar } from "./searchBar"

const createUri = (query: string) => `https://api.pexels.com/v1/search?query=${query}&per_page=20&orientation=portrait`
const authKey = 'auth-key'

export const PexelsWallpapers = () => {
    const [draftQuery, setDraftQuery] = React.useState('')
    const [query, setQuery] = React.useState('wallpapers')
    const { data, isLoading } = useQuery<SearchPayload>({
        queryKey: [query],
        queryFn: async (params) => {
            const response = await fetch(createUri(params.queryKey[0] as string), {
                headers: {
                    Authorization: authKey
                }
            }).then(res => res.json())
            return response;
        },
    })

    const onSearch = () => {
        if (draftQuery.length > 0) {
            setQuery(draftQuery)
            Keyboard.dismiss();
        }
    }
    const scrollX = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x / (imageWidth + spacing);
    })

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" />}
            {!isLoading && (
                <View style={StyleSheet.absoluteFillObject}>
                    {data?.photos.map((photo, index) => (
                        <BackdropPhoto key={photo.id} photo={photo} index={index} scrollX={scrollX} />
                    ))}
                </View>
            )}
            <SearchBar draftQuery={draftQuery} setDraftQuery={setDraftQuery} onSearch={onSearch} />
            <Animated.FlatList
                key={data?.photos[0]?.id}
                entering={FadeInDown.springify().damping(80).stiffness(200)}
                exiting={FadeOutDown.springify().damping(80).stiffness(200)}
                style={styles.listContainer}
                showsHorizontalScrollIndicator={false}
                data={data?.photos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <PhotoItem item={item} index={index} scrollX={scrollX} />}
                horizontal={true}
                pagingEnabled
                snapToInterval={imageWidth + spacing}
                decelerationRate="fast"
                contentContainerStyle={styles.listContentContainer}
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        flexGrow: 0,
    },
    listContentContainer: {
        gap: spacing,
        paddingHorizontal: (width - imageWidth) / 2
    }
})