import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./HomeScreen";
import Details from "./Details";
import Search from "./Search";
import Profil from "./Profil";

const Stack = createStackNavigator();

const CharacterStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: true }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: true }} />
            <Stack.Screen name="Profil" component={Profil} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}

export default CharacterStack;