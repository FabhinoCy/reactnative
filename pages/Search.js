import React, {useState, useEffect} from "react";
import {FlatList, Text, View, TextInput} from "react-native";

function Search() {
    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const apiURL = "https://rickandmortyapi.com/api/character";
        fetch(apiURL)
            .then((response) => response.json())
            .then((json) => {
                setFilterData(json.results);
                setMasterData(json.results);
            }).catch((error) => {
            console.error(error);
        });
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(masterData);
            setSearch(text);
        }
    }

    const ItemView = ({item}) => {
        return (
            <Text>
                {item.id}{'. '}{item.name.toUpperCase()}
            </Text>
        );
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#c8c8c8',
                }}
            />
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Search</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => searchFilter(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            <FlatList data={filterData} keyExtractor={(item, index) => index.toString()} ItemSeparatorComponent={ItemSeparatorView} renderItem={ItemView}/>
        </View>
    );
}

export default Search;