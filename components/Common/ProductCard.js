import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS, SHADOWS, SIZES, FONTS } from '../../constants'

const ProductCard = ({ product, navigation }) => {

    const setProductHistory = async (product) => {
        try {
            const value = await AsyncStorage.getItem('product_history');
            if (value !== null) {
                var product_history = JSON.parse(value).filter(function( obj ) {
                    return obj._id !== product._id;
                }).concat([product]);

                if(product_history.length > 50) product_history.shift();

                await AsyncStorage.setItem('product_history', JSON.stringify(product_history));
            }
            else{
                const product_history = [product]
                await AsyncStorage.setItem('product_history', JSON.stringify(product_history));
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                <TouchableOpacity
                    onPress={() =>{
                        setProductHistory(product);
                        navigation.navigate("Details", { data: product })
                    }}
                >
                    <Image
                        source={{
                            uri: 'https://storage.googleapis.com/efiss/data' + product.images[0].substring(1),
                        }}
                        resizeMode='contain'
                        style={{ height: '100%', borderTopLeftRadius: SIZES.small, borderTopRightRadius: SIZES.small }}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{ width: "100%", padding: SIZES.small }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.small
                        }}
                        numberOfLines={1}
                        onPress={() =>{
                            setProductHistory(product);
                            navigation.navigate("Details", { data: product })
                        }}
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
                        <Entypo name={'colours'} size={SIZES.small} color={COLORS.primary} />
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.small,
                                marginLeft: SIZES.base / 2
                            }}
                        >
                            {product.price.replace(/(\r\n|\n|\r)/gm, " ")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const DetailsView = (id, navigation) => {
    navigation.navigate("Details", { productId: id })
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.small,
    }
})

export default ProductCard