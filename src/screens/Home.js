import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	SafeAreaView, ScrollView,
	StatusBar, Modal,
} from 'react-native';

import {
	COLORS,
} from '../constants';
import {
	ModalPicker, ProductHistoryCarousel, ProductRecommendCarousel,
	AdsBar, SearchBar, HomeHeader, AdsCollections,
} from '../components';

function Home() {
	const navigation = useNavigation();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const changeModalVisibility = (bool) => {
		setIsModalVisible(bool);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<StatusBar translucent={false} backgroundColor={COLORS.primary} />
			<HomeHeader
				onLogin={() => navigation.navigate('Login')}
				onProfile={() => navigation.navigate('Profile')}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<SearchBar
					onPicture={() => changeModalVisibility(true)}
					navigation={navigation}
				/>
				<AdsBar />
				<AdsCollections navigation={navigation} />
				<ProductRecommendCarousel navigation={navigation} />
				<ProductHistoryCarousel navigation={navigation} />
			</ScrollView>

			<Modal
				transparent
				animationType="fade"
				visible={isModalVisible}
				onRequestClose={() => changeModalVisibility(false)}
			>
				<ModalPicker changeModalVisibility={changeModalVisibility} navigation={navigation} />
			</Modal>
		</SafeAreaView>
	);
}

export default Home;
