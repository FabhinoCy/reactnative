import React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import characterStack from "../pages/CharacterStack";
import Favoris from "../pages/Favoris";

const Tab = createBottomTabNavigator();

function BottomNav () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Personnages" component={characterStack} options={{
                title: 'Liste',
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={{
                                uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
                            }}
                        />
                    );
                }
            }} />
            <Tab.Screen name="Favoris" component={Favoris} options={{
                title: 'Favoris',
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={{
                                uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
                            }}
                        />
                    );
                }
            }} />
        </Tab.Navigator>
    )
}

export default BottomNav;