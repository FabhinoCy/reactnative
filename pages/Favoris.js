import React from "react"
import {AsyncStorage, Button, Image, StyleSheet, Text, View, ScrollView} from "react-native";

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
                                <>
                                    <Text key={item.id} style={styles.nom}>{item.name}</Text>
                                    <Image source={{uri: item.image}} style={styles.image}/>
                                    <Button title="Supprimer des favoris" onPress={() => {retirerItem(item)}} />
                                </>
                            )
                        }
                    ) : <Text>Vous n'avez enregistré aucun favoris</Text>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        minWidth: '70%',
        height: 100
    },
    nom: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center',
        marginTop: 10
    }
});

export default Favoris;