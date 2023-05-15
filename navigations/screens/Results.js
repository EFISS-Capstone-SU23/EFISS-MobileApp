import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import axios from "axios";

import { COLORS, SIZES, FONTS } from '../../constants'
import { ResultsHeader, ProductCard } from '../../components'
import { config } from '../../config';

const Results = ({ route, navigation }) => {
  const { imageUrl } = route.params;

  const { products, isLoading, error } = getResults(imageUrl)

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={products.searchResults}
            renderItem={({ item }) => (
              <ProductCard product={item} navigation={navigation} />
            )}
            numColumns={2}
            keyExtractor={item => item?._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            ListHeaderComponent={<ResultsHeader navigation={navigation} />}
            ListFooterComponent={<Text style={{textAlign: 'center', fontFamily: FONTS.bold}}>No more results found</Text>}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        )}

      </View>
    </SafeAreaView>
  )
}

const getResults = (imageUrl) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`, { encodedImage: imageUrl });
      
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
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Results