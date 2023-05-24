/* eslint-disable react/style-prop-object */
import {
	View, Text, StyleSheet, StatusBar,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function Settings() {
	return (
		<View style={styles.container}>
			<Text>Settings</Text>
			<StatusBar style="auto" />
		</View>
	);
}

export default Settings;
