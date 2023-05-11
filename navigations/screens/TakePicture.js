import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import * as FileSystem from 'expo-file-system';

import { CameraButton } from '../../components';

const TakePicture = ({ route, navigation }) => {
    const [hasCameraPermisson, setHasCameraPermissons] = useState(null);
    const [image, setImage] = useState(null);
    const [image64, setImage64] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermissons(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                var base64 = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });

                setImage(data.uri);
                var base64 = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });
                setImage64(base64)
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (hasCameraPermisson === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    ratio='16:9'
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 30
                    }}>
                        <CameraButton icon="arrow-left"
                            onPress={() => navigation.goBack()}
                        />
                        <CameraButton icon="flash"
                            color={flash === Camera.Constants.FlashMode.off ? '#f1f1f1' : 'yellow'}
                            onPress={() => {
                                setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                            }} 
                        />
                    </View>
                </Camera>
                :
                <Image source={{ uri: image }} style={styles.camera} />
            }

            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30
                    }}>
                        <CameraButton icon="arrow-left" title={"Cancel"}
                            onPress={() => navigation.goBack()}
                        />
                        <CameraButton title={"Re-take"} icon="ccw" onPress={() => setImage(null)} />
                        <CameraButton title={"Search"} icon="magnifying-glass" onPress={() => navigation.navigate("Results", { imageUrl: image64 })} />
                    </View>
                    :
                    <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture} />
                }

            </View>
        </View>
    );
}

export default TakePicture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 15
    },
    camera: {
        flex: 1,
        borderRadius: 20
    }
});