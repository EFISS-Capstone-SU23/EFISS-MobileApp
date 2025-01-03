import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

import {
	COLORS, SIZES, FONTS, SHADOWS,
} from '../../constants';

export function CircleButton({ imgUrl, handlePress, ...props }) {
	return (
		<TouchableOpacity
			style={{
				width: 40,
				height: 40,
				backgroundColor: COLORS.white,
				opacity: 0.6,
				position: 'absolute',
				borderRadius: SIZES.extraLarge,
				alignItems: 'center',
				justifyContent: 'center',
				...SHADOWS.light,
				...props,
			}}
			onPress={handlePress}
		>
			<Image
				source={imgUrl}
				resizeMode="contain"
				style={{ width: 24, height: 24 }}
			/>
		</TouchableOpacity>
	);
}

export function RectButton({
	minWidth, fontSize, title, handlePress, ...props
}) {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: COLORS.primary,
				paddingVertical: SIZES.base / 2,
				borderRadius: SIZES.extraLarge,
				minWidth,
				...props,
			}}
			onPress={handlePress}
		>
			<Text
				style={{
					fontFamily: FONTS.bold,
					fontSize,
					color: COLORS.white,
					textAlign: 'center',
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
