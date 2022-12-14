import React from "react";
import {Text, View, Image, Button, StyleSheet, AsyncStorage} from "react-native";

function Details({route}) {

    const item = route.params.item
    const [favoris, setFavoris] = React.useState(false);

    React.useEffect(() => {
        AsyncStorage.getItem('favoris')
            .then((value) => {
                const favorisParsed = JSON.parse(value);
                const itemAlreadyInFavoris = favorisParsed.find((itemInFavoris) => itemInFavoris.id === item.id);
                if (itemAlreadyInFavoris) {
                    setFavoris(true);
                }
            });
    });

    const ajouterFavoris = async () => {
        const favoris = await AsyncStorage.getItem('favoris');
        if (favoris !== null) {
            const favorisParsed = JSON.parse(favoris);
            const itemAlreadyInFavoris = favorisParsed.find((itemInFavoris) => itemInFavoris.id === item.id);
            if (itemAlreadyInFavoris) {
                console.log('Déjà dans les favoris');
            } else {
                favorisParsed.push(item);
                await AsyncStorage.setItem('favoris', JSON.stringify(favorisParsed));
                setFavoris(true);
            }
        } else {
            await AsyncStorage.setItem('favoris', JSON.stringify([item]));
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.nom}>{item.name}</Text>
            <Text>{item.status === 'Alive' ? 'Vivant' : 'Mort'} - {item.species === 'Human' ? 'Humain' : 'Alien'}</Text>
            <Text>{item.gender === 'Male' ? 'Masculin' : 'Féminin'}</Text>
            {
                favoris === true ? '' : <Button title="Ajouter aux favoris" onPress={ajouterFavoris} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        minWidth: '100%',
        height: 350
    },
    nom: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2b6e01',
        textAlign: 'center',
        marginTop: 10
    }
});

export default Details;