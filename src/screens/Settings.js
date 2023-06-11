import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
} from 'react-native';
import { AppBar } from '@react-native-material/core';

import { COLORS, FONTS, SIZES } from '../constants';
import { Action } from '../components';

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
		fontFamily: FONTS.semiBold,
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

const SECTIONS = [
	{
		header: 'Trợ giúp',
		items: [
			{
				id: 'bug', icon: 'flag', label: 'Báo cáo lỗi', type: 'link',
			},
			{
				id: 'contact', icon: 'mail', label: 'Liên hệ với chúng tôi', type: 'link',
			},
			{
				id: 'rating', icon: 'price-ribbon', label: 'Đánh giá ứng dụng', type: 'link',
			},
		],
	},
];

export default function Example() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppBar title="Cài đặt" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />

				{SECTIONS.map(({ header, items }) => (
					<View style={styles.section} key={header}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionHeaderText}>{header}</Text>
						</View>
						<View style={styles.sectionBody}>
							{items.map(({ id, label, icon }) => (
								<Action
									key={id}
									title={label}
									icon={icon}
									onPress={() => {}}
								/>
							))}
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
