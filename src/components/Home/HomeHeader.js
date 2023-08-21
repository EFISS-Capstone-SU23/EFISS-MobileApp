import {
	View, StyleSheet, TouchableOpacity,
	Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import {
	COLORS, FONTS,
} from '../../constants';

const styles = StyleSheet.create({
	header: {
		paddingVertical: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: COLORS.primary,
	},
	logoText: {
		color: COLORS.white,
		fontSize: 32,
		fontFamily: FONTS.bold,
	},
});

function HomeHeader({ onLogin, onProfile }) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	return (
		<View style={styles.header}>
			<Text style={styles.logoText}>
				EFISS
			</Text>
			{userToken ? (
				<TouchableOpacity
					onPress={onProfile}
				>
					<Icon
						name="person"
						type="ionicon"
						size={32}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={onLogin}
				>
					<Icon
						name="log-in"
						type="ionicon"
						size={32}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			)}

		</View>
	);
}

export default HomeHeader;
