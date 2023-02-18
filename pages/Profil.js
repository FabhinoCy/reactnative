import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, StyleSheet, AsyncStorage, TouchableOpacity} from "react-native";
import { Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import imagePicto from "../assets/img/photo.png";

function Profil({navigation}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [favoris, setFavoris] = React.useState([]);
    const [favorisLength, setFavorisLength] = React.useState(0);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            AsyncStorage.setItem('image', result.assets[0].uri);
            console.log('toto')
        }
    };

    useEffect(() => {
        AsyncStorage.getItem('favoris').then((value) => {
            setFavoris(JSON.parse(value));
        });
        setFavorisLength(favoris.length);

        AsyncStorage.getItem('image').then((value) => {
            setImage(value);
        });

        const getData = async () => {
            try {
                const firstName = await AsyncStorage.getItem('firstName');
                const lastName = await AsyncStorage.getItem('lastName');
                const age = await AsyncStorage.getItem('age');
                if (firstName !== null && lastName !== null && age !== null) {
                    setFirstName(firstName);
                    setLastName(lastName);
                    setAge(age);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    });

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('firstName', firstName);
            await AsyncStorage.setItem('lastName', lastName);
            await AsyncStorage.setItem('age', age);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {
                image &&
                <Image
                    source={{ uri: image }}
                    style={{width: 100, height: 100, borderRadius: 50}}
                />
            }
            <TouchableOpacity style={styles.Button} onPress={pickImage}>
                <Image source={imagePicto} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.TextFavoris}>Nombre de favoris :
                <Text style={styles.Favoris}>{favorisLength}</Text>
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favoris')}>
                <Text style={styles.buttonText}>Voir les favoris</Text>
            </TouchableOpacity>
            <Text style={styles.Label}>Prénom</Text>
            <TextInput
                style={styles.Input}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholder="Prénom"
            />
            <Text style={styles.Label}>Nom</Text>
            <TextInput
                style={styles.Input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholder="Nom"
            />
            <Text style={styles.Label}>Age</Text>
            <TextInput
                style={styles.Input}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Âge"
            />
            <Button title="Sauvegarder" onPress={saveData}/>
        </View>
    );
}

const styles = StyleSheet.create({
    Button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 10
    },
    TextFavoris: {
        color: 'brown',
        padding: 10,
        margin: 5
    },
    Favoris: {
        color: 'red',
        fontSize: 18
    },
    Input: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 8,
        width: 300,
        height: 40
    },
    Label: {
        marginLeft: 10,
        marginTop: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    button: {
        marginTop: 5,
        backgroundColor: '#fc4100',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Profil;