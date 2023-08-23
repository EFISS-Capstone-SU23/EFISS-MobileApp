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
import NumericInput from 'react-native-numeric-input';
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
		fontWeight: '600',
		color: COLORS.tertiary,
		textTransform: 'uppercase',
		letterSpacing: 1.2,
	},
	slider: {
		marginTop: SIZES.base,
		marginHorizontal: SIZES.large,
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
				<AppBar title="Cài đặt tìm kiếm" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>
							Số kết quả tìm kiếm trên 1 trang:
						</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: SIZES.base,
							}}
						>
							<NumericInput
								value={pageSize}
								onChange={(value) => setPageSize(value)}
								onLimitReached={(isMax, msg) => console.log(isMax, msg)}
								totalWidth={240}
								totalHeight={40}
								minValue={16}
								maxValue={30}
								iconSize={25}
								step={2}
								valueType="integer"
								rounded
								textColor={COLORS.primary}
								iconStyle={{ color: 'white' }}
								rightButtonBackgroundColor={COLORS.primary}
								leftButtonBackgroundColor={COLORS.primary}
							/>
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
								marginTop: SIZES.base,
								flexDirection: 'row',
							}}
						>
							<Text>
								Giống nhất
							</Text>
							<Slider
								style={{ width: 200, height: 40 }}
								minimumValue={1}
								maximumValue={80}
								value={diversity}
								onValueChange={(val) => setDiversity(val)}
								minimumTrackTintColor="#000000"
								maximumTrackTintColor="#000000"
							/>
							<Text>
								Đa dạng
							</Text>
						</View>
					</View>
					<View style={styles.bottomSection}>
						<Button
							color={COLORS.primary}
							uppercase={false}
							title="Lưu thay đổi"
							onPress={saveSettings}
						/>
						<Divider style={{ margin: SIZES.medium }} />
						<Button
							title="Quay lại"
							uppercase={false}
							variant="outlined"
							color={COLORS.black}
							onPress={() => navigation.goBack()}
							style={styles.submitBtn}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SearchPreferences;
