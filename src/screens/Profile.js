import {
	View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../constants';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: COLORS.primary,
		paddingTop: 20,
		width: '90%',
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.white,
	},
	profile: {
		flexDirection: 'row',
		marginTop: SIZES.extraLarge * 2,
		marginBottom: SIZES.extraLarge,
		width: '90%',
	},
	profileText: {
		fontFamily: FONTS.light,
		fontSize: SIZES.medium,
		color: COLORS.white,
	},
	avatar: {
		height: 100,
		width: 100,
		borderRadius: 85,
		borderWidth: 2,
		borderColor: COLORS.white,
	},
	option: {
		marginVertical: SIZES.font,
	},
	text: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.medium,
		color: COLORS.gray,
	},
	modal: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		borderColor: COLORS.gray,
		borderWidth: 1,
		paddingVertical: SIZES.base,
		paddingHorizontal: SIZES.font,
		justifyContent: 'space-between', // Space between vertically
		flexDirection: 'column', // Optional: Default is column
		width: '90%',
		marginBottom: SIZES.large,
	},
	saveButton: {
		backgroundColor: COLORS.red,
		height: 44,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
	},
	logoutButton: {
		color: COLORS.white,
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
});

function Profile() {
	const navigation = useNavigation();

	const { logout } = useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container}>

			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					Hồ sơ cá nhân
				</Text>
				<View>
					<TouchableOpacity style={{ marginLeft: 5 }}>
						<Entypo name="heart" color={COLORS.red} size={SIZES.extraLarge * 1.5} />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.profile}>
				<View style={{
					marginRight: SIZES.medium,
				}}
				>
					<Image
						source={{ uri: 'https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg' }}
						style={styles.avatar}
					/>
				</View>
				<View style={{
					justifyContent: 'center',
				}}
				>
					<Text style={[styles.profileText, { fontFamily: FONTS.bold }]}>John Doe</Text>
					<Text style={styles.profileText}>0963487538</Text>
					<Text style={styles.profileText}>johndoe@gmail.com</Text>
				</View>
			</View>

			<View style={styles.modal}>
				<TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile')}>
					<Text style={styles.text}>Chỉnh sửa hồ sơ</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={() => console.log('Language')}>
					<Text style={styles.text}>Ngôn ngữ</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={() => console.log('Feedback')}>
					<Text style={styles.text}>Đánh giá ứng dụng</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={() => console.log('Term & Conditions')}>
					<Text style={styles.text}>Điều khoản & dịch vụ</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={() => console.log('Report a bug')}>
					<Text style={styles.text}>Báo cáo lỗi</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.saveButton} onPress={logout}>
				<Text style={styles.logoutButton}>
					Đăng xuất
				</Text>
			</TouchableOpacity>

			<View style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: -1,
			}}
			>
				<View style={{ height: '50%', backgroundColor: COLORS.primary }} />
			</View>
		</SafeAreaView>
	);
}

export default Profile;
