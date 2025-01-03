import React, { useContext, useEffect, useState } from 'react';
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
		fontFamily: FONTS.bold,
		color: COLORS.tertiary,
		textTransform: 'uppercase',
		letterSpacing: 1.2,
	},
	sectionBody: {

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

	const [clickCount, setClickCount] = useState(0);
	useEffect(() => {
		if (clickCount === 7) {
			setClickCount(0);
			navigation.navigate('SecretSettings');
		}
	}, [clickCount]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppBar
					title="Cài đặt"
					style={styles.header}
					titleStyle={{
						color: COLORS.secondary,
						textAlign: 'center',
						fontFamily: FONTS.medium,
					}}
				/>

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
						<Text
							style={styles.sectionHeaderText}
							onPress={() => {
								setClickCount(clickCount + 1);
							}}
						>
							Ứng dụng
						</Text>
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
