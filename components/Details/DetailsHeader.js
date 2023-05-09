import { View, Image, StatusBar, Dimensions } from 'react-native'
import React from 'react'

import { CircleButton } from '../Common/Button'
import { COLORS, SIZES, assets } from '../../constants'

const WIDTH = Dimensions.get('window').width 

const DetailsHeader = ({ data, navigation }) => {
    return (
        <View style={{ width: WIDTH, height: '60%'}}>
            <Image 
                source={{uri: data.image}}
                resizeMode='cover'
                style={{ width: WIDTH, height: '100%' }}
            />
            <CircleButton
                imgUrl={assets.left}
                handlePress={() => navigation.goBack()}
                left={15}
                top={SIZES.medium}
            />
            <CircleButton
                imgUrl={assets.dots}
                right={15}
                top={SIZES.medium}
            />
            <CircleButton
                imgUrl={assets.heartTrans}
                right={65}
                top={SIZES.medium}
            />
            <CircleButton
                imgUrl={assets.share}
                right={115}
                top={SIZES.medium}
            />
        </View>
    )
}

export default DetailsHeader