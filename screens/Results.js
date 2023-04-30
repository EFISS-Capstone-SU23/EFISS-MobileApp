import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants'
import { CircleButton, RectButton, SubInfo, FocusStatusBar, ResultsHeader, ResultCard } from '../components'
import axios from "axios";

const Results = ({ route, navigation }) => {
  const { data } = route.params

  const { products, isLoading, error } = getResults()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} style={{flex: 1, alignItems:'center', justifyContent:'center'}} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={products.data}
            renderItem={({ item }) => (
              <ResultCard product={item} />
            )}
            numColumns={2}
            keyExtractor={item => item?.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            ListHeaderComponent={<ResultsHeader navigation={navigation}/>}
            ListFooterComponent={<Text>No more results found</Text>}
            style={{ padding: SIZES.medium }}
            stickyHeaderIndices={[0]}
          />
        )}
        
      </View>
    </SafeAreaView>
  )
}

const getResults = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://fakestoreapi.com/products`,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setProducts(response);
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