import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';


// Screens
import HomeStack from './HomeStack';
import Details from "./screens/Details";
import Results from "./screens/Results";
import TakePicture from "./screens/TakePicture";
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent"
    }
}

export default function MainContainer() {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="HomeStack"
            >
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Results" component={Results} />
                <Stack.Screen name="TakePicture" component={TakePicture} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
