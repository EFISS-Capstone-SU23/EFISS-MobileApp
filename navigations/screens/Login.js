import {
	View, Text, StyleSheet, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import { FONTS, SIZES, COLORS } from '../../constants';
import logo from '../../assets/images/logo-no-background.png';

function Login() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={{ paddingHorizontal: 25 }}>
				<View style={{ alignItems: 'center' }}>
					<Image source={logo} style={{ width: '100%' }} resizeMode="contain" />
				</View>
				<Text
					style={{
						fontFamily: FONTS.bold,
						fontSize: SIZES.extraLarge,
						fontWeight: '500',
						color: COLORS.primary,
						marginBottom: 30,
						textAlign: 'center',
					}}
				>
					Đăng nhập
				</Text>
				<View style={{
					flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: SIZES.base, marginBottom: 25,
				}}
				>
					<Entypo name="email" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
					<TextInput
						placeholder="Email/Số điện thoại của bạn"
						style={{ flex: 1, paddingVertical: 0 }}
						keyboardType="email-address"
					/>
				</View>
				<View style={{
					flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: SIZES.base, marginBottom: 25,
				}}
				>
					<Entypo name="key" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
					<TextInput
						placeholder="Mật khẩu"
						style={{ flex: 1, paddingVertical: 0 }}
						secureTextEntry
					/>
				</View>
				<TouchableOpacity
					onPress={() => { }}
					style={{
						backgroundColor: COLORS.primary,
						padding: 20,
						borderRadius: 10,
						marginBottom: 30,
					}}
				>
					<Text style={{ color: COLORS.white, fontFamily: FONTS.bold, textAlign: 'center' }}>Đăng nhập</Text>
				</TouchableOpacity>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text>Chưa có tài khoản?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}> Đăng ký</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});

export default Login;
