import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { COLORS, SIZES, FONTS } from '../../constants'

const DetailsDesc = () => {
  return (
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
  )
}

const styles = StyleSheet.create({
  table: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.font,
    borderRadius: SIZES.radius,
    borderTopColor: COLORS.primary,
    borderTopWidth: SIZES.base / 4
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

export default DetailsDesc