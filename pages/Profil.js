import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, StyleSheet, AsyncStorage} from "react-native";

function Profil() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
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
    }, []);

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
            <Text style={styles.Titre}>Mon Profil</Text>
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
    Titre: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        color: 'blue'
    },
    Input: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 10,
    },
    Label: {
        marginLeft: 10,
        marginTop: 10,
    }
});

export default Profil;