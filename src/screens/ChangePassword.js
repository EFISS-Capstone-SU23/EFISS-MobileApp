import {
	View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES } from '../constants';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		padding: 20,
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
	inputField: {
		flexDirection: 'column',
		marginBottom: SIZES.base,
	},
	inputTitle: {
		fontFamily: FONTS.bold,
		color: COLORS.primary,
	},
	textInputContainer: {
		height: 44,
		width: '100%',
		borderColor: COLORS.lightGray,
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: 'center',
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		height: 44,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SIZES.extraLarge,
	},
});

function ChangePassword({ navigation }) {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<MaterialIcons
						name="keyboard-arrow-left"
						size={24}
						color={COLORS.primary}
					/>
				</TouchableOpacity>

				<Text style={styles.headerTitle}>
					Đổi mật khẩu
				</Text>
			</View>

			<ScrollView>
				<View style={{ marginHorizontal: 22, marginTop: 22 }}>
					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Mật khẩu mới</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={newPassword}
								onChangeText={(text) => setNewPassword(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Nhập lại khẩu mới</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={confirmNewPassword}
								onChangeText={(text) => setConfirmNewPassword(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Mật khẩu hiện tại</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={oldPassword}
								onChangeText={(text) => setOldPassword(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
						<Text style={{ color: COLORS.white }}>
							Lưu thay đổi
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default ChangePassword;
