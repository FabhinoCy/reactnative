import React from "react"
import {Text, View} from "react-native";

function Details({navigation, route}) {

    const item= route.params.item
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Récupération des données</Text>
            <Text>{item.name}</Text>
        </View>
    );
}

export default Details;