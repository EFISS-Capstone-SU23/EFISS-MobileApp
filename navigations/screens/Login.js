import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import { COLORS, FONTS, SIZES } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to EFISS</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <View style={{ marginTop: SIZES.font, alignItems: 'center' }}>
        <View style={styles.input}>
          <TextInput
            placeholder='Email/Mobile Number'
            placeholderTextColor={COLORS.white}
            style={{ flex: 1 }}
            onChangeText={() => { }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder='Password'
            placeholderTextColor={COLORS.white}
            style={{ flex: 1 }}
            onChangeText={() => { }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: SIZES.medium,
              marginTop: SIZES.base,
              marginBottom: SIZES.base,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
          >
            <Text style={{
              color: COLORS.primary,
              fontSize: SIZES.medium,
              fontFamily: FONTS.bold,
              textAlign: 'center'
            }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Don't have an account? {' '}
            <Text style={[styles.subtitle, { fontFamily: FONTS.bold }]}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    fontFamily: FONTS.bold,
    textAlign: 'center'
  },
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    textAlign: 'center'
  },
  input: {
    width: "80%",
    borderRadius: SIZES.extraLarge,
    borderColor: COLORS.white,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    marginTop: SIZES.small,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: COLORS.white,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10
  }
});

export default Login