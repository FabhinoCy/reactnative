import React from "react"
import {Text, View, Image, Button, StyleSheet, AsyncStorage} from "react-native";

function Details({route}) {

    const item= route.params.item

    const ajouterFavoris = async () => {
        let students = [];
        students.push({name: item.name,gender:item.gender});
        console.log(students);
        await AsyncStorage.setItem('favoris', JSON.stringify(students));
        console.log('token', await AsyncStorage.getItem('favoris'));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.nom}>{item.name}</Text>
            <Text>{item.status === 'Alive' ? 'Vivant' : 'Mort'} - {item.species === 'Human' ? 'Humain' : 'Alien'}</Text>
            <Text>{item.gender === 'Male' ? 'Masculin' : 'Féminin'}</Text>
            <Button title="Ajouter aux favoris" onPress={ajouterFavoris} />
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