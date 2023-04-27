import { View, Text } from 'react-native'
import React from 'react'

const Results = ({ imageUrl }) => {
  return (
    <View>
      <Text>{imageUrl}</Text>
    </View>
  )
}

export default Results