import React, { useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
	ToastAndroid,
} from 'react-native';
import { AppBar, Button } from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import NumericInput from 'react-native-numeric-input';

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
		fontFamily: FONTS.semiBold,
		color: COLORS.white,
		marginBottom: 6,
	},
});

function SearchPreferences() {
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
								totalHeight={50}
								minValue={16}
								maxValue={30}
								iconSize={25}
								step={1}
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
							Diversity
						</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: SIZES.base,
							}}
						>
							<NumericInput
								value={diversity}
								onChange={(value) => setDiversity(value)}
								onLimitReached={(isMax, msg) => console.log(isMax, msg)}
								totalWidth={240}
								totalHeight={50}
								minValue={1}
								maxValue={20}
								iconSize={25}
								step={1}
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
						<Button color={COLORS.primary} title="Lưu thay đổi" onPress={saveSettings} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SearchPreferences;
