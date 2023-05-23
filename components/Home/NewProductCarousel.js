import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

import { FONTS, SIZES, COLORS } from '../../constants'
import CarouselCard from '../Common/CarouselCard';

const ProductRecommendCarousel = ({ navigation }) => {
  const { products, isLoading, error } = getProductRecommend()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Có thể bạn sẽ thích</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <CarouselCard product={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

const getProductRecommend = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const value = await AsyncStorage.getItem('product_history');
      if (value !== null) {
        var product_history = JSON.parse(value);
        setProducts(product_history.reverse());
        setIsLoading(false);
      }
      else {
        setProducts([]);
        setIsLoading(false);
      }
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, isLoading, error };
};

const styles = StyleSheet.create({
  container: {
    margin: SIZES.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.base / 2
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default ProductRecommendCarousel