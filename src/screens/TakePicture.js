import {
	StyleSheet, Text, View, Image, CommonActions,
	ToastAndroid,
} from 'react-native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import * as FileSystem from 'expo-file-system';

import { CameraButton } from '../components';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
		borderRadius: 20,
	},
});

function TakePicture({ navigation }) {
	const [hasCameraPermisson, setHasCameraPermissons] = useState(null);
	const [image, setImage] = useState(null);
	const [image64, setImage64] = useState(null);
	// const [type, setType] = useState(Camera.Constants.Type.back);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermissons(cameraStatus.status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync();
				// const base64 = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });

				setImage(data.uri);
				const base64 = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });
				setImage64(base64);
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (hasCameraPermisson === false) {
		return (
			<View style={styles.container}>
				<Text>No access to camera</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!image
				? (
					<Camera
						style={styles.camera}
						type={cameraType}
						flashMode={flash}
						ref={cameraRef}
						ratio="16:9"
					>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							padding: 30,
						}}
						>
							<CameraButton
								icon="arrow-left"
								onPress={() => {
									if (navigation.canGoBack()) navigation.goBack();
									else {
										navigation.dispatch(
											CommonActions.reset({
												index: 0,
												routes: [{ name: 'HomeStack' }],
											}),
										);
									}
								}}
							/>
						</View>
					</Camera>
				)
				: <Image source={{ uri: image }} style={styles.camera} />}

			<View>
				{image
					? (
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingHorizontal: 30,
						}}
						>
							<CameraButton
								icon="arrow-left"
								title="Cancel"
								onPress={() => {
									if (navigation.canGoBack()) navigation.goBack();
									else {
										navigation.dispatch(
											CommonActions.reset({
												index: 0,
												routes: [{ name: 'HomeStack' }],
											}),
										);
									}
								}}
							/>
							<CameraButton title="Re-take" icon="ccw" onPress={() => setImage(null)} />
							<CameraButton title="Search" icon="magnifying-glass" onPress={() => navigation.navigate('Results', { imageUrl: image64 })} />
						</View>
					)
					: (
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingHorizontal: 30,
							paddingVertical: 5,
						}}
						>
							<CameraButton
								icon="retweet"
								onPress={() => {
									const { Type } = Camera.Constants;
									setCameraType(cameraType === Type.back ? Type.front : Type.back);
									ToastAndroid.showWithGravity(
										'Chuyển camera',
										ToastAndroid.SHORT,
										ToastAndroid.BOTTOM,
									);
								}}
							/>
							<CameraButton icon="camera" onPress={takePicture} />
							<CameraButton
								icon="flash"
								color={flash === Camera.Constants.FlashMode.off ? '#f1f1f1' : 'yellow'}
								onPress={() => {
									const { FlashMode } = Camera.Constants;
									setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off);
									ToastAndroid.showWithGravity(
										flash === FlashMode.off ? 'Bật flash' : 'Tắt flash',
										ToastAndroid.SHORT,
										ToastAndroid.BOTTOM,
									);
								}}
							/>
						</View>
					)}

			</View>
		</View>
	);
}

export default TakePicture;
