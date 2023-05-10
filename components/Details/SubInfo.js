import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

import { COLORS, SIZES, FONTS } from '../../constants'

const SubInfo = () => {
  return (
    <View
      style={{
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.primary,
        borderTopWidth: SIZES.base / 4,
        paddingTop: SIZES.base / 2
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Entypo name={'globe'} size={SIZES.medium} color={COLORS.primary} />
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            margin: SIZES.base,
          }}
        >EFISS Store</Text>
      </View>

      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: COLORS.primary,
          padding: SIZES.base / 2,
          borderRadius: SIZES.small,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: COLORS.white, fontFamily: FONTS.bold }}>Follow</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SubInfo