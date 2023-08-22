import React, { useContext } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppBar } from '@react-native-material/core';
import { useSelector } from 'react-redux';

import { COLORS, FONTS, SIZES } from '../constants';
import { Action } from '../components';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
	container: {
		paddingBottom: SIZES.extraLarge,
	},
	section: {
		paddingTop: SIZES.small,
	},
	sectionHeader: {
		paddingHorizontal: SIZES.extraLarge,
		paddingVertical: SIZES.base,
	},
	sectionHeaderText: {
		fontSize: SIZES.font,
		fontWeight: '600',
		color: COLORS.tertiary,
		textTransform: 'uppercase',
		letterSpacing: 1.2,
	},
	sectionBody: {

	},
	header: {
		backgroundColor: COLORS.white,
	},
	title: {
		fontSize: 32,
		fontFamily: FONTS.bold,
		color: COLORS.white,
		marginBottom: 6,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingRight: SIZES.extraLarge,
		height: 50,
	},
	rowWrapper: {
		paddingLeft: SIZES.extraLarge,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderColor: COLORS.primary,
	},
	rowIcon: {
		marginRight: SIZES.small,
	},
	rowLabel: {
		fontSize: SIZES.medium,
		fontWeight: '500',
		color: COLORS.primary,
	},
	rowSpacer: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
});

function Settings() {
	const {
		logout,
	} = useContext(AuthContext);

	const navigation = useNavigation();

	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppBar title="Cài đặt" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />

				{userToken && userToken !== null && (
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionHeaderText}>Tài khoản</Text>
						</View>
						<View style={styles.sectionBody}>
							<Action
								title="Thông tin tài khoản"
								icon="person-circle-outline"
								onPress={() => navigation.navigate('Profile')}
							/>
							<Action
								title="Báo cáo lỗi"
								icon="bug-outline"
								onPress={() => navigation.navigate('BugReport')}
							/>
							<Action
								title="Đăng xuất"
								icon="log-out-outline"
								onPress={logout}
							/>
						</View>
					</View>
				)}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>Ứng dụng</Text>
					</View>
					<View style={styles.sectionBody}>
						<Action
							title="Cài đặt tìm kiếm"
							icon="search-outline"
							onPress={() => navigation.navigate('Preferences')}
						/>
						<Action
							title="Liên hệ với chúng tôi"
							icon="mail"
							onPress={() => { }}
						/>
						<Action
							title="Đánh giá ứng dụng"
							icon="star-half-outline"
							onPress={() => { }}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Settings;
