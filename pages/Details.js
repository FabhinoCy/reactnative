import React from "react";
import {Text, View, Image, Button, StyleSheet, AsyncStorage, TouchableOpacity} from "react-native";
import imagePicto from "../assets/img/photo.png";

function Details({route}) {

    const item                  = route.params.item
    const [favoris, setFavoris] = React.useState(false);

    React.useEffect(() => {
        AsyncStorage.getItem('favoris')
            .then((value) => {
                const favorisParsed        = JSON.parse(value);
                const itemAlreadyInFavoris = favorisParsed.find((itemInFavoris) => itemInFavoris.id === item.id);
                if (itemAlreadyInFavoris) {
                    setFavoris(true);
                }
            });
    });

    const ajouterFavoris = async () => {
        const favoris = await AsyncStorage.getItem('favoris');
        if (favoris !== null) {
            const favorisParsed        = JSON.parse(favoris);
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
            <Text style={styles.mort}>{item.status === 'Alive' ? 'Vivant' : 'Mort'} - {item.species === 'Human' ? 'Humain' : 'Alien'}</Text>
            <Text style={styles.location}>{item.location.name}</Text>
            <Text style={styles.genre}>{item.gender === 'Male' ? 'Masculin' : 'Féminin'}</Text>
            {
                favoris === true ? '' :
                <TouchableOpacity style={styles.button} onPress={ajouterFavoris}>
                    <Text style={styles.buttonText}>Ajouter aux favoris</Text>
                </TouchableOpacity>
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
        color: 'blue',
        marginTop: 8
    },
    location: {
        color: 'orange',
        fontWeight: '700',
        fontSize: 15,
        marginTop: 8
    },
    mort: {
        color: 'brown',
        fontWeight: '700',
        fontSize: 15,
        marginTop: 8
    },
    genre: {
        color: 'green',
        marginTop: 8
    },
    button: {
        marginTop: 8,
        backgroundColor: '#fc4100',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Details;