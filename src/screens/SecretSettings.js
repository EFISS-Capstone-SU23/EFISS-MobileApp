import {
	View,
	StyleSheet, SafeAreaView,
} from 'react-native';
import {
	AppBar, Switch,
	Button, Text, Divider, TextInput,
} from '@react-native-material/core';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
	COLORS, FONTS, SIZES,
} from '../constants';
import {
	config, updateBaseApi, updateImgUrl, updateLocalStatus,
} from '../../config';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.primary,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	backButton: {
		position: 'absolute',
		left: 20,
		top: 10,
		padding: 10,
		backgroundColor: COLORS.white,
		borderRadius: 10,
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.medium,
		color: COLORS.white,
		marginLeft: 12,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderColor: COLORS.primary,
		borderWidth: 1,
		resizeMode: 'contain',
		backgroundColor: COLORS.primary,
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		zIndex: 9999,
	},
	inputField: {
		flexDirection: 'column',
		marginVertical: 10,
	},
	inputTitle: {
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	textInputContainer: {
		width: '100%',
		justifyContent: 'center',
		backgroundColor: COLORS.white,
	},
	saveButton: {
		marginBottom: SIZES.medium,
		borderRadius: SIZES.base,
		justifyContent: 'center',
	},
	errorContainer: {
		height: SIZES.extraLarge,
	},
	errorMessage: {
		color: COLORS.red,
		fontSize: 10,
	},
	loadingIndicator: {
		flex: 1, // Take full height
		alignSelf: 'stretch', // Stretch to fill the parent container horizontally
		justifyContent: 'center',
		alignItems: 'center',
		height: SIZES.HEIGHT,
	},
});

function SecretSettings({ navigation }) {
	const [baseApi, setBaseApi] = useState(config.BE_BASE_API);
	const [isLocal, setIsLocal] = useState(config.IS_LOCAL);
	const [imageStorage, setImageStorage] = useState(config.IMG_STORAGE_URL);

	const handleLocalUpdate = () => {
		if (baseApi && baseApi.length > 0) {
			updateBaseApi(baseApi);
		}
		if (imageStorage) {
			updateImgUrl(imageStorage);
		}
		if (isLocal) {
			updateLocalStatus(isLocal);
		}
	};

	return (
		// eslint-disable-next-line react/self-closing-comp
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<AppBar
				title="Chế độ nhà phát triển"
				style={styles.header}
				titleStyle={{
					color: COLORS.secondary,
					textAlign: 'center',
					fontFamily: FONTS.medium,
				}}
			/>
			<ScrollView>

				<View style={{ marginHorizontal: 22 }}>
					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>BE_BASE_API:</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								placeholder="BE_BASE_API"
								style={{ flex: 1, paddingVertical: 0 }}
								color={COLORS.primary}
								defaultValue={config.BE_BASE_API}
								onChangeText={(val) => setBaseApi(val)}
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>IS_LOCAL:</Text>
						<View style={styles.textInputContainer}>
							<Switch
								trackColor={{ false: COLORS.grey, true: COLORS.primary }}
								thumbColor={isLocal ? COLORS.primary : COLORS.secondary}
								onValueChange={() => setIsLocal(!isLocal)}
								value={isLocal}
							/>
						</View>
					</View>

					{isLocal && (
						<View style={styles.inputField}>
							<Text style={styles.inputTitle}>IMG_STORAGE_URL:</Text>
							<View style={styles.textInputContainer}>
								<TextInput
									placeholder="IMG_STORAGE_URL"
									style={{ flex: 1, paddingVertical: 0 }}
									color={COLORS.primary}
									defaultValue={config.IMG_STORAGE_URL}
									onChangeText={(val) => setImageStorage(val)}
								/>
							</View>
						</View>
					)}
					<View style={[styles.sectionHeader, { flex: 1, marginTop: 50 }]}>
						<Button
							title="Lưu thay đổi"
							uppercase={false}
							color={COLORS.primary}
							style={styles.saveButton}
							titleStyle={{
								color: COLORS.secondary,
								fontFamily: FONTS.medium,
							}}
							onPress={handleLocalUpdate}
						/>
						<Divider style={{ marginBottom: SIZES.medium }} />
						<Button
							title="Quay lại"
							uppercase={false}
							variant="outlined"
							color={COLORS.black}
							onPress={() => navigation.goBack()}
							style={styles.saveButton}
							titleStyle={{
								fontFamily: FONTS.medium,
							}}
						/>
					</View>
				</View>

			</ScrollView>
		</SafeAreaView>
	);
}

export default SecretSettings;
