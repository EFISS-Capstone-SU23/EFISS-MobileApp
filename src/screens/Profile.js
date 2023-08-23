/* eslint-disable react/style-prop-object */
import {
	SafeAreaView, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity,
} from 'react-native';
import {
	ActivityIndicator, AppBar, Avatar, Text,
} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import {
	COLORS, FONTS, SIZES,
} from '../constants';
import { AuthContext } from '../context/AuthContext';
import { Action, ErrorView } from '../components';
import { loadUserProfile } from '../actions/userActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
	},
	header: {
		backgroundColor: COLORS.primary,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	title: {
		fontSize: 32,
		fontFamily: FONTS.bold,
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
		backgroundColor: COLORS.primary,
	},
	nameSection: {
		marginLeft: SIZES.medium,
	},
	text: {
		fontFamily: FONTS.light,
		fontSize: SIZES.medium,
		color: COLORS.quaternary,
	},
	actionTitle: {
		color: COLORS.red,
		fontFamily: FONTS.bold,
		fontSize: SIZES.medium,
	},
});

function Profile() {
	const {
		logout,
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const [refreshControl, setRefreshControl] = useState(false);

	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	const userLoadProfile = useSelector((state) => state.userLoadProfile);
	const { loading, error, userInfo } = userLoadProfile;

	useEffect(() => {
		dispatch(loadUserProfile(userToken));
	}, [dispatch]);

	return (
		<SafeAreaView style={styles.container}>
			<AppBar
				title="Tài khoản của bạn"
				style={styles.header}
				titleStyle={{
					color: COLORS.secondary,
					textAlign: 'center',
					fontFamily: FONTS.medium,
				}}
			/>
			{loading ? (
				<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
			) : error ? (
				<ErrorView navigation={navigation} />
			) : (
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
					<View style={styles.profileInfos}>
						<View style={{
							marginRight: SIZES.medium,
						}}
						>
							<Avatar label={`${userInfo?.lastName} ${userInfo?.firstName}`} style={styles.avatar} labelStyle={{ color: COLORS.secondary }} />
						</View>
						<View style={styles.nameSection}>
							<Text style={[styles.text, { fontFamily: FONTS.bold, color: COLORS.black }]}>{`${userInfo?.lastName} ${userInfo?.firstName}`}</Text>
							<Text style={styles.text}>{userInfo?.email}</Text>
							<TouchableOpacity style={{ marginTop: SIZES.base }} onPress={logout}>
								<Text style={styles.actionTitle}>Đăng xuất</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.actions}>
						<Action
							title="Chỉnh sửa thông tin"
							icon="create-outline"
							onPress={() => navigation.navigate('EditProfile')}
						/>
						<Action
							title="Bộ sưu tập"
							icon="heart"
							onPress={() => navigation.navigate('Collections')}
						/>
						<Action
							title="Xác minh email"
							icon="at-outline"
							onPress={() => navigation.navigate('VerifyEmail')}
						/>
						<Action
							title="Đổi mật khẩu"
							icon="key-outline"
							onPress={() => navigation.navigate('ChangePassword')}
						/>
						<Action
							title="Quay lại"
							icon="arrow-back-outline"
							onPress={() => navigation.goBack()}
						/>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

export default Profile;
