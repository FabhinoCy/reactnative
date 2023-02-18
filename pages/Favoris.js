import React from "react"
import {AsyncStorage, Button, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";

function Favoris() {

    const [favoris, setFavoris]             = React.useState([]);
    const [favorisLength, setFavorisLength] = React.useState(0);

    React.useEffect(() => {
        AsyncStorage.getItem('favoris').then((value) => {
            setFavoris(JSON.parse(value));
        });
        setFavorisLength(favoris.length);
    });

    const retirerItem = async (item) => {
        const favoris         = await AsyncStorage.getItem('favoris');
        const favorisParsed   = JSON.parse(favoris);
        const favorisFiltered = await favorisParsed.filter((itemInFavoris) => itemInFavoris.id !== item.id);
        AsyncStorage.setItem('favoris', JSON.stringify(favorisFiltered));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
                {
                    favorisLength !== 0 ? favoris.map((item) => {
                        return (
                            <View key={item.id}>
                                <Text style={styles.nom}>{item.name}</Text>
                                <Image source={{uri: item.image}} style={styles.image} />
                                <TouchableOpacity style={styles.button} onPress={() => {retirerItem(item)}}>
                                    <Text style={styles.buttonText}>Supprimer des favoris</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }) : <Text>Vous n'avez enregistré aucun favori</Text>
                }
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
        minWidth: '70%',
        height: 200
    },
    nom: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center',
        marginTop: 10
    },
    button: {
        marginTop: 8,
        backgroundColor: '#fc4100',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Favoris;