import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

import { COLORS, FONTS, SIZES, assets } from '../../constants'
import ResultsHeaderTag from './ResultsHeaderTag'

const TAGS = [
    {
        title: 'Sort by',
        icon: 'bar-graph'
    },
    {
        title: 'Location',
        icon: 'map'
    },
    {
        title: 'Category',
        icon: 'list'
    }
]

const ResultsHeader = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: COLORS.primary,
            padding: SIZES.small
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, { flex: 0 }]}>
                    <Entypo name={'arrow-left'} size={28} color={'#f1f1f1'} />
                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.extraLarge,
                        color: COLORS.white,
                        textAlign: 'center',
                        flex: 1
                    }}
                >
                    Results
                </Text>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList
                    data={TAGS}
                    renderItem={({ item }) => (
                        <ResultsHeaderTag tag={item} handlePress={() => { }} />
                    )}
                    keyExtractor={item => item.title}
                    contentContainerStyle={{
                        columnGap: SIZES.small
                    }}
                    horizontal
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#f1f1f1'
    },
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.large,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default ResultsHeader
