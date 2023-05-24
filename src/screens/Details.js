import { View, Text, StatusBar, TouchableOpacity, FlatList, Image, Animated, Linking, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo, Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../constants'
import { RenderImageItem } from '../components';

const Details = ({ route, navigation }) => {
    const { data } = route.params

    const scrollX = new Animated.Value(0)

    let position = Animated.divide(scrollX, SIZES.WIDTH)

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} />
            <ScrollView>
                <View style={styles.scrollSection}>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name={'chevron-left'} style={styles.button} />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: SIZES.medium,
                            }}
                        >
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Entypo name={'heart'} style={styles.button} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { Linking.openURL(data.url) }}>
                                <Entypo name={'share'} style={styles.button} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={data.images ? data.images : null}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <RenderImageItem item={item} />
                        )}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={SIZES.WIDTH}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                    />
                    <View style={styles.imgIndicatorContainer} >
                        {
                            data.images ?
                                data.images.map((img, index) => {
                                    let opacity = position.interpolate({
                                        inputRange: [index - 1, index, index + 1],
                                        outputRange: [0.2, 1, 0.2],
                                        extrapolate: 'clamp',
                                    })

                                    return (
                                        <Animated.View style={styles.imgIndicator(opacity)}></Animated.View>
                                    )
                                }) : null
                        }
                    </View>
                </View>
                <View style={{ margin: SIZES.font }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Entypo name='shopping-cart'
                            style={{ fontSize: SIZES.large, color: COLORS.primary, marginRight: 6 }}
                        />
                        <Text style={styles.category}>
                            Shopping
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {data.title}
                        </Text>
                        <Ionicons name='link-outline' style={styles.copyButton} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name='credit' style={{ fontSize: SIZES.medium, color: COLORS.primary }} />
                        <Text style={styles.price}>
                            {data.price.replace(/(\r\n|\n|\r)/gm, " ")}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                            <View style={styles.location} >
                                <Entypo name='location-pin' style={{ fontSize: SIZES.medium, color: COLORS.primary }} />
                            </View>
                            <Text>Hanoi</Text>
                        </View>
                        <Entypo name='chevron-right' style={{ fontSize: 22, color: COLORS.primary }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: SIZES.medium, color: COLORS.primary, fontFamily: FONTS.bold }}>
                            Mô tả sản phẩm:
                        </Text>
                        <Text style={styles.description}>
                            {data.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    scrollSection: {
        width: '100%',
        backgroundColor: COLORS.black,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4
    },
    buttonBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SIZES.base,
        paddingLeft: 16,
        marginBottom: SIZES.base,
        paddingBottom: SIZES.base,
        backgroundColor: COLORS.primary
    },
    button: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        padding: 12,
        backgroundColor: COLORS.white,
        borderRadius: 20
    },
    imgContainer: {
        width: SIZES.WIDTH,
        height: SIZES.HEIGHT * 2 / 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black
    },
    imgIndicatorContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.base,
        marginBottom: SIZES.base,
    },
    imgIndicator: (opacity) => ({
        width: '2%',
        height: 2.4,
        backgroundColor: COLORS.white,
        opacity,
        marginHorizontal: SIZES.base / 2,
        borderRadius: 100
    }),
    category: {
        fontSize: SIZES.font,
        color: COLORS.black,
        fontFamily: FONTS.regular
    },
    titleContainer: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
        marginVertical: 4,
        maxWidth: '84%'
    },
    copyButton: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        marginRight: 6,
        backgroundColor: COLORS.lightGray,
        padding: 8,
        borderRadius: 100,
    },
    price: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.semiBold,
        maxWidth: '85%',
        color: COLORS.black,
        opacity: 0.7
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: SIZES.medium,
        borderTopColor: COLORS.primary,
        borderTopWidth: 1,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        paddingVertical: SIZES.base
    },
    location: {
        color: COLORS.primary,
        backgroundColor: COLORS.lightGray,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 100,
        marginRight: 10,
    },
    description: {
        fontSize: SIZES.font,
        color: COLORS.black,
        fontFamily: FONTS.regular,
        letterSpacing: 1,
        opacity: 0.5,
        lineHeight: 20
    }
})

export default Details