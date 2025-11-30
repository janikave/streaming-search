import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Checkbox } from "react-native-paper";
import SearchButton from "./Searchbutton";
import SpotifyToken from "./Spotifytoken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchBar({ navigation }) {


    const [search, setSearch] = useState(""); // Variable for setting input for search

    const [spotifyToken, setSpotifyToken] = useState(""); // Variable for setting token for Spotify API usage

    // Setting up checkboxes for both streaming services
    const [spotifyCheck, setSpotifyCheck] = useState(true);
    const [deezerCheck, setDeezerCheck] = useState(true);

    // Hook for fetching Spotify token
    useEffect(() => {
        const fetchSpotifyToken = async () => {
            const tok = await SpotifyToken();
            setSpotifyToken(tok);
        };
        fetchSpotifyToken();
    }, []);

    // Saving search querys for search history component
    const saveSearch = async (query) => {

        if (!query.trim()) return; // Ensuring that empty search won't get saved on search history

        try {
            const oldSearchHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];

            const filterSearchHistory = oldSearchHistory.filter(item => item !== query);

            const newSearchHistory = [query, ...filterSearchHistory.slice(0, 10)];
            await AsyncStorage.setItem('history', JSON.stringify(newSearchHistory));
        } catch (err) {
            console.error("Error in saving item: ", err)
        }
    }

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
                    color="white"
                    style={styles.checkbox}
                    status={spotifyCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSpotifyCheck(!spotifyCheck)
                    }}
                />
                <Image
                    style={styles.logos}
                    source={require('../assets/deezerlogo.png')}
                />
                <Checkbox
                    color="white"
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
            <SearchButton onPress={async () => {

                await saveSearch(search); // Saving search to search history
                console.log(await AsyncStorage.getItem('history'))

                // Navigation for results depending on checkboxes chosen
                if (!spotifyCheck && !deezerCheck) {
                    alert("Pick at least one streaming service."); // Stopping search without any checkboxes checked
                    return;
                }

                
                if (search.length == 0) {
                    alert("Please put something in the search");
                    return;
                }

                // Alert for missing Spotify token
                if (spotifyCheck && !spotifyToken) {
                    alert("Search failure: Unable to search without token");
                    return;
                }

                // Setting conditions on navigating to different results
                if (spotifyCheck && !deezerCheck) {
                    navigation.navigate("Spotify Results", { query: search, spotifyToken, spotifyCheck });
                } else if (!spotifyCheck && deezerCheck) {
                    navigation.navigate("Deezer Results", { query: search, deezerCheck })
                } else {
                    navigation.navigate("Results", { query: search, spotifyToken, spotifyCheck, deezerCheck }); // Showing results from both services
                }


            }} />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36454f",
    },
    header: {
        fontSize: 35,
        fontFamily: "Avenir-Oblique",
        marginBottom: 40,
        color: '#F2F3F4'
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