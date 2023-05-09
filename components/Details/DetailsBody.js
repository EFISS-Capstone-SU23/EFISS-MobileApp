import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import DetailsHeader from './DetailsHeader'

import { COLORS, FONTS, SIZES } from '../../constants'

const DetailsBody = ({ data, navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#E5E5E5',
      }}
    >
      <DetailsHeader data={data} navigation={navigation} />
      <View
        style={{
          padding: SIZES.base,
          borderRadius: SIZES.small,
          backgroundColor: COLORS.white
        }}
      >
        <Text style={styles.text}>{data.title}</Text>
        <Text style={[styles.text, { color: COLORS.primary }]}>${data.price}</Text>
      </View>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            margin: SIZES.small,
          }}
        >EFISS Store</Text>
        <TouchableOpacity
          style={{
            width: '30%',
            backgroundColor: COLORS.primary,
            padding: SIZES.base,
            borderRadius: SIZES.small,
            margin: SIZES.small,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.white, fontFamily: FONTS.bold }}>Follow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Condition</Text>
          <Text style={styles.cell}>Organic</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Price Type</Text>
          <Text style={styles.cell}>Fixed</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Category</Text>
          <Text style={styles.cell}>Beverages</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Location</Text>
          <Text style={styles.cell}>Hanoi</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Condition</Text>
          <Text style={styles.cell}>Organic</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Price Type</Text>
          <Text style={styles.cell}>Fixed</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Category</Text>
          <Text style={styles.cell}>Beverages</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellHead}>Location</Text>
          <Text style={styles.cell}>Hanoi</Text>
        </View>
      </View>
    </SafeAreaView>
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