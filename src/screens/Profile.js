/* eslint-disable react/style-prop-object */
import {
	SafeAreaView, View, Text, StyleSheet, ScrollView, Image, RefreshControl,
} from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';

import {
	COLORS, FONTS, SIZES, assets,
} from '../constants';
import { AuthContext } from '../context/AuthContext';
import { Action } from '../components';
import { loadUserProfile } from '../actions/userActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.secondary,
		justifyContent: 'center',
	},
	header: {
		backgroundColor: COLORS.primary,
	},
	title: {
		fontSize: 32,
		fontFamily: FONTS.semiBold,
		color: COLORS.white,
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
		resizeMode: 'contain',
	},
	nameSection: {
		marginLeft: SIZES.medium,
	},
	text: {
		fontFamily: FONTS.light,
		fontSize: SIZES.medium,
		color: COLORS.quaternary,
	},
});

function Profile() {
	const {
		userToken, logout,
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const [refreshControl, setRefreshControl] = useState(false);

	const dispatch = useDispatch();
	const userLoadProfile = useSelector((state) => state.userLoadProfile);
	const { loading, error, userInfo } = userLoadProfile;

	useEffect(() => {
		dispatch(loadUserProfile(userToken));
	}, [dispatch]);

	return (
		<SafeAreaView style={styles.container}>
			<AppBar title="Tài khoản của bạn" style={styles.header} titleStyle={{ textAlign: 'center' }} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 29,
				}}
				refreshControl={(
					<RefreshControl
						refreshing={refreshControl}
						onRefresh={() => {
							setRefreshControl(true);
							dispatch(loadUserProfile(userToken));
							setRefreshControl(false);
						}}
					/>
				)}
			>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<View style={styles.profileInfos}>
						<View style={{
							marginRight: SIZES.medium,
						}}
						>
							<Image
								source={assets.avatar}
								style={styles.avatar}
							/>
						</View>
						<View style={styles.nameSection}>
							<Text style={[styles.text, { fontFamily: FONTS.bold, color: COLORS.quaternary }]}>{`${userInfo?.lastName} ${userInfo?.firstName}`}</Text>
							<Text style={styles.text}>{userInfo?.email}</Text>
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
