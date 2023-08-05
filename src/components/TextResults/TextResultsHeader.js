import {
	View,
} from 'react-native';
import {
	Text, IconButton,
} from '@react-native-material/core';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import {
	COLORS, SIZES,
} from '../../constants';

function TextResultsHeader({ navigation, query }) {
	return (
		<View style={{ backgroundColor: COLORS.primary, padding: SIZES.base }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingHorizontal: 5,
				}}
			>
				<IconButton
					onPress={() => navigation.goBack()}
					icon={<Entypo name="chevron-left" color={COLORS.white} size={28} />}
				/>

				<Text variant="button" color={COLORS.white} style={{ fontSize: SIZES.extraLarge }}>Kết quả</Text>
				<Text color={COLORS.white} style={{ fontSize: SIZES.font }}>
					{`'${query}'`}
				</Text>
			</View>
		</View>
	);
}

export default TextResultsHeader;
