import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Linking  } from 'react-native'
import React from 'react'

import DetailsHeader from './DetailsHeader'
import DetailsDesc from './DetailsDesc'
import SubInfo from './SubInfo'
import DetailsInfo from './DetailsInfo'
import { COLORS, FONTS, SHADOWS, SIZES } from '../../constants'
import { RectButton } from '../Common/Button'

const DetailsBody = ({ data, navigation }) => {
  return (
    <React.Fragment>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} title={'Go to Store'} handlePress={() => {Linking.openURL(data.url);
    }} />
      </View>

      <DetailsHeader data={data} navigation={navigation} />
      <DetailsInfo data={data} />

      <View
        style={{
          padding: SIZES.font
        }}
      >

        <SubInfo />
        <DetailsDesc />
      </View>
    </React.Fragment>

  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large
  },
  table: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.font
  },
  row: {
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: COLORS.white
  },
  cellHead: {
    width: '40%',
    fontFamily: FONTS.regular,
    color: COLORS.gray
  },
  cell: {
    width: '40%',
    fontFamily: FONTS.regular
  }
})

export default DetailsBody