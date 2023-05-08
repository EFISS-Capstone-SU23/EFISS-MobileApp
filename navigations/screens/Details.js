import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import { COLORS, SIZES, FONTS } from '../../constants'
import { RectButton, FocusStatusBar, DetailsBids, DetailsHeader } from '../../components'
import axios from "axios";


const Details = ({ route, navigation }) => {
    const { productId } = route.params
    const { product, isLoading, error } = getResult(productId)

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <Text>{product.title}</Text>
                )}

            </View>
        </SafeAreaView>
    )
}

const getResult = (productId) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://fakestoreapi.com/products/${productId}`,
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setProduct(response.data);
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

    return { product, isLoading, error };
};

export default Details