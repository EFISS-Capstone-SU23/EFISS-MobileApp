import React, { useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
	ToastAndroid,
} from 'react-native';
import { AppBar, Button, Divider } from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from '@react-native-community/slider';

import { COLORS, FONTS, SIZES } from '../constants';

import { config, updateDiversity, updatePageSize } from '../../config';

const styles = StyleSheet.create({
	container: {
		paddingBottom: SIZES.extraLarge,
	},
	section: {
		paddingTop: SIZES.small,
	},
	sectionHeader: {
		paddingVertical: SIZES.base,
		paddingHorizontal: SIZES.extraLarge,
	},
	sectionHeaderText: {
		fontSize: SIZES.font,
		fontFamily: FONTS.bold,
		color: COLORS.tertiary,
		textTransform: 'uppercase',
		letterSpacing: 1.2,
	},
	slider: {
		marginTop: SIZES.base,
		marginHorizontal: SIZES.large,
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
});

function SearchPreferences({ navigation }) {
	const [pageSize, setPageSize] = useState(config.PAGE_SIZE);
	const [diversity, setDiversity] = useState(config.DIVERSITY);

	const saveSettings = () => {
		updatePageSize(pageSize);
		updateDiversity(diversity);
		ToastAndroid.showWithGravity(
			'Cập nhật thay đổi thành công',
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppBar
					title="Cài đặt tìm kiếm"
					style={styles.header}
					titleStyle={{
						color: COLORS.secondary,
						textAlign: 'center',
						fontFamily: FONTS.medium,
					}}
				/>
				<View style={[styles.section, { flex: 1 }]}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>
							Số kết quả tìm kiếm trên 1 trang:
							{' '}
							{pageSize}
						</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: SIZES.medium,
								flexDirection: 'row',
							}}
						>
							<Text style={{ fontFamily: FONTS.medium }}>
								16
							</Text>
							<Slider
								style={{ width: 200, height: 40 }}
								minimumValue={16}
								maximumValue={30}
								value={pageSize}
								step={2}
								onValueChange={(val) => setPageSize(val)}
								minimumTrackTintColor="#000000"
								maximumTrackTintColor="#000000"
							/>
							<Text style={{ fontFamily: FONTS.medium }}>
								30
							</Text>
						</View>
					</View>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>
							Kết quả tìm kiếm:
						</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: SIZES.medium,
								flexDirection: 'row',
							}}
						>
							<Text style={{ fontFamily: FONTS.medium }}>
								Giống nhất
							</Text>
							<Slider
								style={{ width: 200, height: 40 }}
								minimumValue={1}
								maximumValue={80}
								step={1}
								value={diversity}
								onValueChange={(val) => setDiversity(val)}
								minimumTrackTintColor="#000000"
								maximumTrackTintColor="#000000"
							/>
							<Text style={{ fontFamily: FONTS.medium }}>
								Đa dạng
							</Text>
						</View>
					</View>
					<View style={[styles.sectionHeader, { flex: 1, marginTop: SIZES.HEIGHT / 2 }]}>
						<Button
							color={COLORS.primary}
							uppercase={false}
							title="Lưu thay đổi"
							onPress={saveSettings}
							titleStyle={{
								color: COLORS.secondary,
								fontFamily: FONTS.medium,
							}}
						/>
						<Divider style={{ margin: SIZES.medium }} />
						<Button
							title="Quay lại"
							uppercase={false}
							variant="outlined"
							color={COLORS.black}
							onPress={() => navigation.goBack()}
							style={styles.submitBtn}
							titleStyle={{
								fontFamily: FONTS.medium,
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SearchPreferences;
