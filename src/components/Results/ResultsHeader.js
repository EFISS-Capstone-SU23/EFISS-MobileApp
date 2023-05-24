import {
	View, Text, Image, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import {
	COLORS, FONTS, SIZES, assets,
} from '../../constants';
import ResultsHeaderTag from './ResultsHeaderTag';

const TAGS = [
	{
		title: 'Bộ lọc',
		icon: 'bar-graph',
	},
	{
		title: 'Địa điểm',
		icon: 'map',
	},
	{
		title: 'Phân loại',
		icon: 'list',
	},
];

function ResultsHeader({ navigation }) {
	return (
		<View style={{ backgroundColor: COLORS.primary, padding: SIZES.small }}>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingHorizontal: 5,
			}}
			>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
					<Entypo name="chevron-left" color={COLORS.primary} size={20} />
				</TouchableOpacity>

				<Text style={styles.text}>
					Kết quả
				</Text>
			</View>

			<View style={styles.tabsContainer}>
				<FlatList
					data={TAGS}
					renderItem={({ item }) => (
						<ResultsHeaderTag tag={item} handlePress={() => { }} />
					)}
					keyExtractor={(item) => item.title}
					contentContainerStyle={{
						columnGap: SIZES.small,
					}}
					horizontal
				/>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginRight: 10,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.extraLarge,
		color: COLORS.white,
		textAlign: 'center',
		flex: 0.8,
	},
	tabsContainer: {
		width: '100%',
		marginTop: SIZES.base,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default ResultsHeader;
