import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

import { COLORS, FONTS, SIZES } from '../../constants'

const RenderImageItem = ({ item }) => {
    return (
        <View style={styles.imgContainer}>
            <Image
                // Move the key prop to the Image component
                source={{ uri: 'https://storage.googleapis.com/efiss/data' + item.substring(1) }}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgContainer: {
        width: SIZES.WIDTH,
        height: SIZES.HEIGHT * 2 / 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black
    },
})

export default RenderImageItem