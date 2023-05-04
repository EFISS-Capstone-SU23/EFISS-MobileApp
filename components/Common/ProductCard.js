import { View, Image, Text } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

import { COLORS, SHADOWS, SIZES, FONTS } from '../../constants'

const ProductCard = ({ product, navigation }) => {
    return (
        <View style={{
            width: "46%",
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            borderColor: COLORS.gray,
            borderWidth: 0.5,
            marginBottom: SIZES.small,
            margin: SIZES.base,
            ...SHADOWS.dark
        }}>
            <View style={{ width: "100%", height: 150 }}>
                <Image
                    source={{
                        uri: product.image,
                    }}
                    style={{ width: "100%", height: "100%", borderTopLeftRadius: SIZES.small, borderTopRightRadius: SIZES.small }}
                />
            </View>
            <View
                style={{ width: "100%", padding: SIZES.base }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.small
                        }}
                        numberOfLines={1}
                    >
                        {product.title}
                    </Text>
                </View>
                <View style={{
                    marginTop: SIZES.font,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Entypo name={'colours'} size={14} color={COLORS.primary} />
                        <Text
                            style={{
                                fontFamily: FONTS.medium,
                                fontSize: SIZES.small,
                                marginLeft: 2,
                                color: COLORS.gray
                            }}
                        >{product.category}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.font
                            }}
                        >
                            ${product.price}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductCard