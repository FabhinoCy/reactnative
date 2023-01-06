import React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import characterStack from "../pages/CharacterStack";
import Favoris from "../pages/Favoris";
import Search from "../pages/Search";
import listeLogo from '../assets/img/liste.png';
import favorisLogo from '../assets/img/star.png';
import searchLogo from "../assets/img/loupe.png";
import profilLogo from '../assets/img/user.png';
import Profil from "../pages/Profil";

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
                            source={listeLogo}
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
                            source={favorisLogo}
                        />
                    );
                }
            }} />
            <Tab.Screen name="Search" component={Search} options={{
                title: 'Search',
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={searchLogo}
                        />
                    );
                }
            }} />
            <Tab.Screen name="Profil" component={Profil} options={{
                title: 'Profil',
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={profilLogo}
                        />
                    );
                }
            }} />
        </Tab.Navigator>
    )
}

export default BottomNav;