import React from 'react'
import { View, SafeAreaView, FlatList } from 'react-native'
import { SIZES, SHADOWS } from '../constants'
import { RectButton, FocusStatusBar, DetailsBids, DetailsHeader } from '../components'


const Details = ({ route, navigation }) => {
    const { data } = route.params

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusStatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />

            <View style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                paddingVertical: SIZES.font,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 1,
            }}>
                <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
            </View>

            <FlatList
                data={data.bids}
                renderItem={(item) => <DetailsBids bid={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
                ListHeaderComponent={() => (
                    <DetailsHeader data={data} navigation={navigation} />
                )}
            />
        </SafeAreaView>
    )
}

export default Details