import { View, Text, Image } from 'react-native'

import { COLORS, SIZES, SHADOWS, assets } from '../constants'
import { CircleButton, RectButton } from './Button'
import { SubInfo, EthPrice, NFTTitle } from './SubInfo'

const ResultCard = ({ product }) => {
  return (
    <View style={{
      width: "45%",
      backgroundColor: COLORS.white,
      borderRadius: SIZES.font,
      marginBottom: SIZES.small,
      margin: SIZES.base,
      ...SHADOWS.dark
    }}>
      <View style={{ width: "100%", height: 200 }}>
        <Image 
          source={{
            uri: product.image,
          }}
          style={{ width: "100%", height: "100%", borderTopLeftRadius: SIZES.small, borderTopRightRadius: SIZES.small }}
        />
        <CircleButton imgUrl={assets.heart} right={10} top={10} />
      </View>

      <View
        style={{ width: "100%", padding: SIZES.base }}
      >
        <NFTTitle
          title={product.title}
          subtitle={product.category}
          titleSize={SIZES.large}
          subtitleSize={SIZES.small}
        />

        <View style={{
          marginTop: SIZES.font,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <EthPrice price={product.price} />
          <RectButton minWidth={60} fontSize={SIZES.font} handlePress={() => navigation.navigate("Details", { product })} />
        </View>
      </View>
    </View>
  )
}

export default ResultCard