import React from "react"
import {AsyncStorage, Text, View} from "react-native";

function Favoris() {

    const [favoris, setFavoris] = React.useState([]);

    React.useEffect(() => {
        AsyncStorage.getItem('favoris').then((value) => {
            setFavoris(JSON.parse(value));
        });
        console.log(favoris);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Favoris</Text>
            <Text>{favoris[0].name}</Text>
        </View>
    );
}

export default Favoris;