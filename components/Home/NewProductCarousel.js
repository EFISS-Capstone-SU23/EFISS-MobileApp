import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from "axios";

import { FONTS, SIZES, COLORS } from '../../constants'
import CarouselCard from '../Common/CarouselCard';

const NewProductCarousel = () => {

  const { products, isLoading, error } = getNewProduct()

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
              <CarouselCard product={item} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

const getNewProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://fakestoreapi.com/products?limit=8`);

      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
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

export default NewProductCarousel