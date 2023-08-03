import React, { useState, useCallback } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
} from 'react-native';
import { AppBar } from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import RangeSlider from 'rn-range-slider';

import { COLORS, FONTS, SIZES } from '../constants';
import {
	Label, Notch, Rail, RailSelected, Thumb,
} from '../components';

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
	const [pageSize, setPageSize] = useState(16);

	const renderThumb = useCallback(() => <Thumb />, []);
	const renderRail = useCallback(() => <Rail />, []);
	const renderRailSelected = useCallback(() => <RailSelected />, []);
	const renderLabel = useCallback((value) => <Label text={value} />, []);
	const renderNotch = useCallback(() => <Notch />, []);
	const handleValueChange = useCallback((val) => {
		setPageSize(val);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppBar title="Cài đặt tìm kiếm" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>
							Số kết quả tìm kiếm trên 1 trang:
							{pageSize}
						</Text>
					</View>
					<RangeSlider
						style={styles.slider}
						min={16}
						max={30}
						step={1}
						floatingLabel
						renderThumb={renderThumb}
						renderRail={renderRail}
						renderRailSelected={renderRailSelected}
						renderLabel={renderLabel}
						renderNotch={renderNotch}
						onValueChanged={handleValueChange}
						disableRange
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SearchPreferences;
