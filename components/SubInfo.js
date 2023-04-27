import { View, Text, Image } from 'react-native'

import { SIZES, FONTS, COLORS, SHADOWS, assets } from '../constants'

export const NFTTitle = ({ title, subtitle, titleSize, subtitleSize }) => {
    return (
        <View>
            <Text
                style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: titleSize,
                    color: COLORS.primary
                }}
                numberOfLines={1}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: subtitleSize,
                    color: COLORS.primary
                }}
                numberOfLines={1}
            >
                {subtitle}
            </Text>
        </View>
    )
}

export const EthPrice = ({price}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image 
                source={assets.price}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    marginRight: 1
                }}
            />
            <Text style={{
                fontFamily: FONTS.small,
                fontSize: SIZES.font,
                color: COLORS.primary
            }}>{price}</Text>
        </View>
    )
}

export const ImageCmp = ({ imgUrl, index }) => {
    return (
        <Image
            source={imgUrl}
            resizeMode='contain'
            style={{
                width: 48,
                height: 48,
                marginLeft: index === 0 ? 0 : -SIZES.font
            }}
        />
    )
}

export const People = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {[assets.person02, assets.person03, assets.person04].map((imgUrl, index) => (
                <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`} />
            ))}
        </View>
    )
}

export const EndDate = () => {
    return (
        <View
            style={{
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                ...SHADOWS.light,
                elevation: 1,
                maxWidth: '50%'
            }}
        >
            <Text
                style={{
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.small,
                    color: COLORS.primary
                }}
            >Ending in</Text>
            <Text
                style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.medium,
                    color: COLORS.primary
                }}
            >12h 30m</Text>
        </View>
    )
}

export const SubInfo = () => {
    return (
        <View style={{
            width: '100%',
            paddingHorizontal: SIZES.font,
            marginTop: -SIZES.extraLarge,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <People />
            <EndDate />
        </View>
    )
}