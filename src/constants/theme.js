import { Dimensions } from 'react-native';

export const COLORS = {
	primary: '#F4717F',
	secondary: '#544E50',
	backroundDark: '#544E50',
	backroundLight: '#E9E3E3',
	black: '#000000',
	white: '#FFF',
	red: '#FF0000',
};

export const SIZES = {
	base: 8,
	small: 12,
	font: 14,
	medium: 16,
	large: 18,
	extraLarge: 24,
	WIDTH: Dimensions.get('window').width,
	HEIGHT: Dimensions.get('window').height,
};

export const FONTS = {
	bold: 'InterBold',
	semiBold: 'InterSemiBold',
	medium: 'InterMedium',
	regular: 'InterRegular',
	light: 'InterLight',
};

export const SHADOWS = {
	light: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	medium: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
	},
	dark: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,

		elevation: 14,
	},
};
