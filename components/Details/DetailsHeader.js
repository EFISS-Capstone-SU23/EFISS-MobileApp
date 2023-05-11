import { View, Image, StatusBar, Dimensions } from 'react-native'
import React from 'react'

import { CircleButton } from '../Common/Button'
import { COLORS, SIZES, assets } from '../../constants'

const WIDTH = Dimensions.get('window').width

const DetailsHeader = ({ data, navigation }) => {
    console.log(data)

    return (
        <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={{ uri: data.image }}
                resizeMode='contain'
                style={{ width: "80%", height: '100%' }}
            />

            <CircleButton
                imgUrl={assets.left}
                handlePress={() => navigation.goBack()}
                left={15}
                top={15}
            />

            <CircleButton
                imgUrl={assets.dots}
                handlePress={() => navigation.goBack()}
                right={15}
                top={15}
            />

            <CircleButton
                imgUrl={assets.heartTrans}
                handlePress={() => navigation.goBack()}
                right={65}
                top={15}
            />

            <CircleButton
                imgUrl={assets.share}
                handlePress={() => navigation.goBack()}
                right={115}
                top={15}
            />
        </View>
    )
}

export default DetailsHeader