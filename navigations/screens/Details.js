import { View, Text, StatusBar, TouchableOpacity, FlatList, Image, Animated, Linking } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo, Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../../constants'

const Details = ({ route, navigation }) => {
    const { data } = route.params

    const scrollX = new Animated.Value(0)

    let position = Animated.divide(scrollX, SIZES.WIDTH)

    const renderImageItem = ({ item, index }) => {
        return (
            <View
                key={index}
                style={{
                    width: SIZES.WIDTH,
                    height: SIZES.HEIGHT * 2 / 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.black
                }}
            >
                <Image
                    source={{ uri: 'https://storage.googleapis.com/efiss/data' + item.substring(1), }}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <StatusBar backgroundColor={COLORS.primary} />
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: COLORS.primary,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 4
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 16,
                            paddingLeft: 16,
                            marginBottom: SIZES.base
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo
                                name={'chevron-left'}
                                style={{
                                    fontSize: SIZES.large,
                                    color: COLORS.primary,
                                    padding: 12,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: SIZES.medium,
                            }}
                        >
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Entypo
                                    name={'heart'}
                                    style={{
                                        fontSize: SIZES.large,
                                        color: COLORS.primary,
                                        padding: 12,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => {Linking.openURL(data.url)}}>
                                <Entypo
                                    name={'share'}
                                    style={{
                                        fontSize: SIZES.large,
                                        color: COLORS.primary,
                                        padding: 12,
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={data.images ? data.images : null}
                        horizontal
                        renderItem={renderImageItem}
                        keyExtractor={data => data?._id}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={SIZES.WIDTH}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                    />
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 16,
                            marginBottom: 32
                        }}
                    >
                        {
                            data.images ?
                                data.images.map((img, index) => {
                                    let opacity = position.interpolate({
                                        inputRange: [index - 1, index, index + 1],
                                        outputRange: [0.2, 1, 0.2],
                                        extrapolate: 'clamp',
                                    })

                                    return (
                                        <Animated.View
                                            style={{
                                                width: '2%',
                                                height: 2.4,
                                                backgroundColor: COLORS.black,
                                                opacity,
                                                marginHorizontal: SIZES.base / 2,
                                                borderRadius: 100
                                            }}
                                        >

                                        </Animated.View>
                                    )
                                }) : null
                        }
                    </View>
                </View>
                <View style={{ margin: SIZES.font }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Entypo name='shopping-cart'
                            style={{
                                fontSize: SIZES.large,
                                color: COLORS.primary,
                                marginRight: 6
                            }}
                        />
                        <Text style={{
                            fontSize: SIZES.font,
                            color: COLORS.black,
                            fontFamily: FONTS.regular
                        }}>
                            Shopping
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontSize: SIZES.extraLarge,
                            color: COLORS.primary,
                            fontFamily: FONTS.bold,
                            letterSpacing: 0.5,
                            marginVertical: 4,
                            maxWidth: '84%'
                        }}>
                            {data.title}
                        </Text>
                        <Ionicons name='link-outline' style={{
                            fontSize: SIZES.extraLarge,
                            color: COLORS.primary,
                            marginRight: 6,
                            backgroundColor: COLORS.lightGray,
                            padding: 8,
                            borderRadius: 100,
                        }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Details