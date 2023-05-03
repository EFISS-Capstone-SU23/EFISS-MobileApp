import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native'

import { COLORS, NFTData } from '../constants'
import { NFTCard, HomeHeader, FocusStatusBar, ModalPicker } from '../components'

const Home = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool);
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
                        ListHeaderComponent={<HomeHeader onSearch={() => {}} onPicture={() => changeModalVisibility(true)} />}
                    />
                </View>

            </View>

            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => changeModalVisibility(false)}
            >
                <ModalPicker changeModalVisibility={changeModalVisibility} />
            </Modal>
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