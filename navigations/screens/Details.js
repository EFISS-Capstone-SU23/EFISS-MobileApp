import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants'
import { FocusStatusBar, DetailsBody } from '../../components'
import axios from "axios";


const Details = ({ route, navigation }) => {
    const { data } = route.params

    return (
        <DetailsBody data={data} navigation={navigation} />
    )
}

const styles = StyleSheet.create({
    commonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
})

export default Details