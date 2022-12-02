import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./HomeScreen";
import Details from "./Details";

const Stack = createStackNavigator();

const CharacterStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}

export default CharacterStack;