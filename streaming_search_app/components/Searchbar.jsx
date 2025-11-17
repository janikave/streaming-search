import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import SearchButton from "./Searchbutton";
import SpotifyToken from "./Spotifytoken";

export default function SearchBar( {navigation}) {
    
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            const tok = await SpotifyToken();
            setToken(tok);
        };
        fetchToken();
    }, []);

    return(
        <View style={styles.page}>
            <Text style={styles.header}>Search for music</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for song, album or an artist"
                onChangeText={setSearch}
                value={search} />
            <SearchButton onPress={() => navigation.navigate("Results", { query: search })} />
        </View>
    )
} 
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 25,
        fontWeight: "700",
        paddingBottom: 30,
        color: 'steelblue'
    },
    searchInput: {
        height: 50,
        width: 300,
        marginBottom: 30,
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        color: "black",
        opacity: 1,
        backgroundColor: "white",
    },
})