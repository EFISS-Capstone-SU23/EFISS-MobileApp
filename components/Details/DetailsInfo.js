import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'

const DetailsInfo = ({ data }) => {
    return (
        <View
            style={{
                marginStart: SIZES.font
            }}
        >
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>${data.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large
    },
    price: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
        color: COLORS.primary
    }
})

export default DetailsInfo