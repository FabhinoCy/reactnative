import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {Text, View, Button, FlatList} from "react-native";

function HomeScreen({navigation}) {
    const [characterListData, setCharacterListData] = useState([])
    const [pagination, setPagination] = useState(0)

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then((res) => {
                setPagination(res.data.info.next)
                setCharacterListData(res.data.results)
            })
    }, [])

    const renderItem = useCallback(({ item }) => (
        <>
            <View>
                <Text >{item.name}</Text>
                <Button title="Detail item" onPress={() => navigation.navigate('Details', {item: item})} />
            </View>
        </>
    ))
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

export default HomeScreen;