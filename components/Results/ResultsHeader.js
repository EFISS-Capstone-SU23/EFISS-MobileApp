import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { CircleButton } from '../Button'
import { COLORS, FONTS, SIZES, assets } from '../../constants'

const ResultsHeader = ({ navigation }) => {
    return (
        <View style={{width: '100%', height: 70}}>
            <CircleButton 
                imgUrl={assets.left}
                handlePress={() => navigation.goBack()}
                left={15}
                top={StatusBar.currentHeight-10}
            />
        </View>
    )
}

export default ResultsHeader