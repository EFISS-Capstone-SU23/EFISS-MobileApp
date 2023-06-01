import {
	View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo-no-background.png';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	title: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		fontWeight: '500',
		color: COLORS.primary,
		marginBottom: 30,
		textAlign: 'center',
	},
	inputField: {
		flexDirection: 'row',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingBottom: SIZES.base,
		marginBottom: 25,
	},
	loginBtn: {
		backgroundColor: COLORS.primary,
		padding: 20,
		borderRadius: 10,
		marginBottom: 30,
	},
	loginBtnTitle: {
		color: COLORS.white,
		fontFamily: FONTS.bold,
		textAlign: 'center',
	},
	textLink: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: SIZES.base,
	},
});

function Login() {
	const navigation = useNavigation();
	const { isLoading, login } = useContext(AuthContext);

	if (isLoading) {
		return <ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />;
	}

	return (
		<View style={styles.container}>
			<View style={{ paddingHorizontal: 25 }}>
				<View style={{ alignItems: 'center' }}>
					<Image source={logo} style={{ width: '100%' }} resizeMode="contain" />
				</View>
				<Text style={styles.title}>
					Đăng nhập
				</Text>
				<View style={styles.inputField}>
					<Entypo name="email" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
					<TextInput
						placeholder="Email/Số điện thoại của bạn"
						style={{ flex: 1, paddingVertical: 0 }}
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.inputField}>
					<Entypo name="key" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
					<TextInput
						placeholder="Mật khẩu"
						style={{ flex: 1, paddingVertical: 0 }}
						secureTextEntry
					/>
				</View>
				<TouchableOpacity onPress={() => { login(); }} style={styles.loginBtn}>
					<Text style={styles.loginBtnTitle}>Đăng nhập</Text>
				</TouchableOpacity>

				<View style={styles.textLink}>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}>Quên mật khẩu?</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.textLink}>
					<Text>Chưa có tài khoản?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text style={{ color: COLORS.primary, fontFamily: FONTS.bold }}> Đăng ký</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default Login;
