import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants';

const styles = StyleSheet.create({
	container: {
		paddingVertical: SIZES.extraLarge,
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
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLORS.primary,
	},
	header: {
		paddingLeft: SIZES.extraLarge,
		paddingRight: SIZES.extraLarge,
	},
	title: {
		fontSize: 32,
		fontFamily: FONTS.semiBold,
		color: COLORS.primary,
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
				id: 'rating', icon: 'star-half', label: 'Đánh giá ứng dụng', type: 'link',
			},
		],
	},
];

export default function Example() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Cài đặt</Text>
				</View>

				{SECTIONS.map(({ header, items }) => (
					<View style={styles.section} key={header}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionHeaderText}>{header}</Text>
						</View>
						<View style={styles.sectionBody}>
							{items.map(({ id, label, icon }, index) => (
								<View
									key={id}
									style={[
										styles.rowWrapper,
										index === 0 && { borderTopWidth: 0 },
									]}
								>
									<TouchableOpacity
										onPress={() => {
											// handle onPress
										}}
									>
										<View style={styles.row}>
											<Ionicons
												color={COLORS.primary}
												name={icon}
												style={styles.rowIcon}
												size={22}
											/>

											<Text style={styles.rowLabel}>{label}</Text>

											<View style={styles.rowSpacer} />

										</View>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
