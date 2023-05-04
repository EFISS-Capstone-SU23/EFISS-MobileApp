import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, assets } from '../../constants'
import { TextInput } from 'react-native-gesture-handler'

const HomeHeader = ({ onSearch, onPicture }) => {
  return (
    <View style={{
      backgroundColor: COLORS.primary,
      padding: SIZES.font
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text 
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.extraLarge,
            color: COLORS.white
          }}
        >
          EFISS
        </Text>

        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode='contain'
            style={{
              width: "100%",
              height: "100%"
            }}
          />
          <Image
            source={assets.badge}
            resizeMode='contain'
            style={{
              position: 'absolute',
              width: 15,
              height: 15,
              bottom: 0,
              right: 0
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white
          }}
        >
          Hello, EFISS User
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2
          }}
        >
          Let’s Fashion Talks!
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View style={{
          width: "100%",
          borderRadius: SIZES.extraLarge,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.font
        }}>
          <TouchableOpacity onPress={onSearch}>
            <Image
              source={assets.search}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base / 2
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder='What are you looking for?'
            style={{ flex: 1 }}
            onChangeText={() => { }}
          />
          <TouchableOpacity onPress={onPicture}>
            <Image
              source={assets.camera}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginRight: SIZES.base / 2
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default HomeHeader