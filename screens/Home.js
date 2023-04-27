import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { COLORS, NFTData } from '../constants'
import { NFTCard, HomeHeader, FocusStatusBar } from '../components'

const Home = () => {
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
            console.log(result.assets[0].uri)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusStatusBar background={COLORS.primary} />

            <View style={{ flex: 1 }}>

                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={NFTData}
                        renderItem={({ item }) => <NFTCard data={item} />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<HomeHeader onSearch={() => { }} onPicture={showImagePicker} />}
                    />
                </View>

                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: -1
                }}>
                    <View style={{ height: "100%", backgroundColor: COLORS.primary }} />
                    <View style={{ flex: 1, backgroundColor: COLORS.white }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});