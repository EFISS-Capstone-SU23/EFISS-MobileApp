import * as React from 'react'
import { useFonts } from "expo-font";

import MainContainer from "./navigations/MainContainer";

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf")
  })

  if(!loaded) return null;

  return (
    <MainContainer />
  );
}

export default App
