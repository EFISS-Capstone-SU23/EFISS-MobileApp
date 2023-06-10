import {
	View, Text, StyleSheet, FlatList,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { IconButton } from '@react-native-material/core';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';
import ResultsHeaderTag from './ResultsHeaderTag';

const TAGS = [
	{
		title: 'Bộ lọc',
		icon: 'bar-graph',
	},
	{
		title: 'Phân loại',
		icon: 'list',
	},
];

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
				<IconButton onPress={() => navigation.goBack()} icon={<Entypo name="chevron-left" color={COLORS.white} size={30} />} />

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

export default ResultsHeader;
