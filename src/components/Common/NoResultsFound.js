import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';

function NoResultsFound() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.font, color: COLORS.primary }}>
				Không tìm thấy kết quả nào phù hợp
			</Text>
		</View>
	);
}

export default NoResultsFound;
