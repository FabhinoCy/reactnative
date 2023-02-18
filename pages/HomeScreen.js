import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {Text, View, Button, FlatList, Image, StyleSheet} from "react-native";

function HomeScreen({navigation}) {
    const [characterListData, setCharacterListData] = useState([])
    const [pagination, setPagination]               = useState(0)

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then((res) => {
                setPagination(res.data.info.next)
                setCharacterListData(res.data.results)
            })
    }, [])

    const renderItem = useCallback(({ item }) => (
        <>
            <View style={styles.container}>
                <Image source={{uri: item.image}} style={styles.image} />
                <Text style={styles.nom}>{item.name}</Text>
                <Button title="Voir" onPress={() => navigation.navigate('Details', {item: item})} />
            </View>
        </>
    ))
    return (
        <View>
            <FlatList
                data={characterListData}
                extraData={characterListData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.5}
                numColumns={2}
                onEndReached={() => {
                    if (pagination) {
                        axios.get(pagination)
                            .then(response => {
                                setCharacterListData([...characterListData, ...response.data.results]);
                                setPagination(response.data.info.next);
                            })
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#08c4b6',
        marginTop: 5,
        margin: 5,
        flex: 1,
        alignItems: 'center'
    },
    image: {
        minWidth: '100%',
        height: 120
    },
    nom: {
        textAlign: 'center',
        color: '#005076',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default HomeScreen;