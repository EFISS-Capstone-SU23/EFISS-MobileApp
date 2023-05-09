import React, { useState } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity, Dimensions, ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import { COLORS, FONTS } from '../../constants';

const OPTIONS = ['Take a picture', 'Upload from gallery', 'Cancel']
const WIDTH = Dimensions.get('window').width * 4 / 5
const HEIGHT = Dimensions.get('window').height / 4

const ModalPicker = (props) => {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            navigation.navigate("Results", { imageUrl: result.assets[0].uri })
        }
    }

    const onPressItem = (option) => {
        props.changeModalVisibility(false)
        switch (option) {
            case 'Take a picture':
                navigation.navigate("TakePicture")
                break;
            case 'Upload from gallery':
                showImagePicker();
                break;
            default:
                break;
        }
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
                style={styles.option}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <View
            style={styles.container}
        >
            <View style={[styles.modal, { width: WIDTH, height: HEIGHT }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {option}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: COLORS.gray,
        borderWidth: 1
    },
    option: {
        width: WIDTH - 20,
        height: HEIGHT / 3 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.white
    }

})

export default ModalPicker