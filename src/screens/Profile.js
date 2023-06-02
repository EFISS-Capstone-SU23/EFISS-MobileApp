/* eslint-disable react/style-prop-object */
import {
	SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { COLORS, FONTS, SIZES } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { Action } from '../components';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	header: {
		paddingLeft: SIZES.extraLarge,
		paddingRight: SIZES.extraLarg,
		marginVertical: SIZES.large,
	},
	title: {
		fontSize: 32,
		fontFamily: FONTS.semiBold,
		color: COLORS.primary,
		marginBottom: 6,
	},
	profileInfos: {
		marginVertical: SIZES.large,
		paddingHorizontal: 29,
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderColor: COLORS.primary,
		borderWidth: 1,
	},
	nameSection: {
		marginLeft: SIZES.medium,
	},
	text: {
		fontFamily: FONTS.light,
		fontSize: SIZES.medium,
	},
});

function Profile() {
	const navigation = useNavigation();

	const {
		error, isLoading, userInfo, logout,
	} = useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Tài khoản của bạn</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 29,
				}}
			>
				{isLoading ? (
					<ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<View style={styles.profileInfos}>
						<View style={{
							marginRight: SIZES.medium,
						}}
						>
							<Image
								source={{ uri: userInfo.image }}
								style={styles.avatar}
							/>
						</View>
						<View style={styles.nameSection}>
							<Text style={[styles.text, { fontFamily: FONTS.bold, color: COLORS.primary }]}>{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
							<Text style={styles.text}>{userInfo.email}</Text>
						</View>
					</View>
				)}
				<View style={styles.actions}>
					<Action
						title="Chỉnh sửa thông tin"
						icon="edit"
						onPress={() => navigation.navigate('EditProfile')}
					/>
					<Action
						title="Wishlist"
						icon="heart"
						onPress={() => navigation.navigate('Wishlist')}
					/>
					<Action title="Xác minh email" icon="email" />
					<Action
						title="Đổi mật khẩu"
						icon="dial-pad"
						onPress={() => navigation.navigate('ChangePassword')}
					/>
					<Action title="Đăng xuất" icon="log-out" onPress={logout} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Profile;
