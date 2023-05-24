import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	View, SafeAreaView, StyleSheet, ScrollView, Modal, StatusBar,
} from 'react-native';

import { COLORS } from '../../constants';
import {
	HomeHeader, ModalPicker, Category, ProductHistoryCarousel, ProductRecommendCarousel,
} from '../../components';

function Home() {
	const navigation = useNavigation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const changeModalVisibility = (bool) => {
		setIsModalVisible(bool);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={COLORS.primary} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						flex: 1,
					}}
				>
					<HomeHeader onSearch={() => {}} onPicture={() => changeModalVisibility(true)} />
					<Category />
					<ProductRecommendCarousel navigation={navigation} />
					<ProductHistoryCarousel navigation={navigation} />
				</View>
			</ScrollView>

			<Modal
				transparent
				animationType="fade"
				visible={isModalVisible}
				onRequestClose={() => changeModalVisibility(false)}
			>
				<ModalPicker changeModalVisibility={changeModalVisibility} />
			</Modal>
		</SafeAreaView>
	);
}

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});