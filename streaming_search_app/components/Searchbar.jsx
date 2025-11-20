import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Image, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import SearchButton from "./Searchbutton";
import SpotifyToken from "./Spotifytoken";
import ScToken from "./Sctoken";

export default function SearchBar({ navigation }) {

    const [search, setSearch] = useState("");

    const [spotifyToken, setSpotifyToken] = useState("");
    const [scToken, setScToken] = useState("");

    const [spotifyCheck, setSpotifyCheck] = useState(true);
    const [scCheck, setScCheck] = useState(true);
    const [deezerCheck, setDeezerCheck] = useState(true);


    useEffect(() => {
        const fetchSpotifyToken = async () => {
            const tok = await SpotifyToken();
            setSpotifyToken(tok);
        };
        fetchSpotifyToken();
    }, []);

    useEffect(() => {
        const fetchScToken = async () => {
            const tok = await ScToken();
            setScToken(tok);
        };
        fetchScToken();
    }, []);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.page}>
            <Text style={styles.header}>Search for music</Text>
            <View style={styles.choices}>
                <Image 
                    style={styles.logos}
                    source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' }}
                    />
                <Checkbox
                    color="#36454f"
                    style={styles.checkbox}
                    status={spotifyCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSpotifyCheck(!spotifyCheck)
                    }}
                />
                <Image 
                    style={styles.logos}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Antu_soundcloud.svg/1200px-Antu_soundcloud.svg.png' }}
                    />
                <Checkbox
                    color="#36454f"
                    style={styles.checkbox}
                    status={scCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setScCheck(!scCheck)
                    }} />
                <Image 
                    style={styles.logos}
                    source={require('../assets/deezerlogo.png')}
                    />
                <Checkbox
                    color="#36454f"
                    style={styles.checkbox}
                    status={deezerCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setDeezerCheck(!deezerCheck)
                    }} />

            </View>
            <TextInput
                id="SearchInput"
                style={styles.searchInput}
                placeholder="Search for song, album or an artist"
                onChangeText={setSearch}
                value={search} />
            <SearchButton onPress={() => {
                if (!spotifyToken) {
                    alert("Loading...");
                    return;
                }
                navigation.navigate("Results", { query: search, spotifyToken });
            }} />
        </ KeyboardAvoidingView>
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
        fontSize: 35,
        fontFamily: "Damascus",
        marginBottom: 40,
        color: '#36454f'
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
    choices: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    logos: {
        height: 40,
        width: 40,
        objectFit: "contain",
    },
})