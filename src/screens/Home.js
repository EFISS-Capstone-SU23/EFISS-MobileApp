// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import {
// 	View, SafeAreaView, StyleSheet, ScrollView, Modal, StatusBar,
// } from 'react-native';

// import { COLORS } from '../constants';
// import {
// 	HomeHeader, ModalPicker, Category, ProductHistoryCarousel, ProductRecommendCarousel, AdsBar,
// } from '../components';

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: COLORS.white,
// 	},
// });

// function Home() {
// 	const navigation = useNavigation();
// 	const [isModalVisible, setIsModalVisible] = useState(false);
// 	const changeModalVisibility = (bool) => {
// 		setIsModalVisible(bool);
// 	};

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<StatusBar backgroundColor={COLORS.primary} />

// 			<ScrollView
// 				showsVerticalScrollIndicator={false}
// 			>
// 				<View style={{ flex: 1 }}>
// 					<HomeHeader
// 						navigation={navigation}
// 						onPicture={() => changeModalVisibility(true)}
// 						onLogin={() => navigation.navigate('Login')}
// 						onProfile={() => navigation.navigate('Profile')}
// 					/>
// 					<AdsBar />
// 					<Category />
// 					<ProductRecommendCarousel navigation={navigation} />
// 					<ProductHistoryCarousel navigation={navigation} />
// 				</View>
// 			</ScrollView>

// 			<Modal
// 				transparent
// 				animationType="fade"
// 				visible={isModalVisible}
// 				onRequestClose={() => changeModalVisibility(false)}
// 			>
// 				<ModalPicker changeModalVisibility={changeModalVisibility} navigation={navigation} />
// 			</Modal>
// 		</SafeAreaView>
// 	);
// }

// export default Home;

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
	ModalPicker, Category, ProductHistoryCarousel, ProductRecommendCarousel,
	AdsBar, SearchBar, HomeHeader,
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
				<Category />
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
