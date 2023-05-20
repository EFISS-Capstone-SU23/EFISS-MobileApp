import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import { COLORS, FONTS, SIZES } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với EFISS</Text>
      <Text style={styles.subtitle}>Đăng nhập bằng tài khoản của bạn</Text>
      <View style={{ marginTop: SIZES.font, alignItems: 'center' }}>
        <View style={styles.input}>
          <TextInput
            placeholder='Email/Số điện thoại của bạn'
            placeholderTextColor={COLORS.white}
            style={{ flex: 1, color: COLORS.white }}
            onChangeText={() => { }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder='Mật khẩu'
            secureTextEntry={true}
            placeholderTextColor={COLORS.white}
            style={{ flex: 1, color: COLORS.white }}
            onChangeText={() => { }}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>
            Chưa có tài khoản? {' '}
            <Text style={[styles.subtitle, { fontFamily: FONTS.bold }]}>
              Đăng ký ngay
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