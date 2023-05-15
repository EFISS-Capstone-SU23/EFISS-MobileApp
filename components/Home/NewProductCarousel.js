import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from "axios";

import { FONTS, SIZES, COLORS } from '../../constants'

const NewProductCarousel = () => {

  const { products, isLoading, error } = getNewProduct()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm mới</Text>
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
              <Text>{item.title}</Text>
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
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
      const response = await axios.get(`https://fakestoreapi.com/products?limit=5`);
      
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
    margin: SIZES.base,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default NewProductCarousel