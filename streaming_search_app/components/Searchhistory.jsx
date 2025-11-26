import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import SpotifyToken from "./Spotifytoken";
import DeleteButton from "./Deletebutton";

export default function SearchHistory({ navigation }) {

    const [history, setHistory] = useState([]); // Variable for results of search history in a list
    const [spotifyToken, setSpotifyToken] = useState(""); // Variable for setting token, needed for a search if user wants to check the results again

    // Fetching Spotify token
    useEffect(() => {
        const fetchSpotifyToken = async () => {
            const tok = await SpotifyToken();
            setSpotifyToken(tok);
        };
        fetchSpotifyToken();
    }, []);

    // Getting history from Async Storage and parsing it on a list
    const getHistory = async () => {
        const searchHistoryData = await AsyncStorage.getItem("history");
        return searchHistoryData ? JSON.parse(searchHistoryData) : [];
    }

    // Hook for setting history on a variable and fetching it
    useFocusEffect(
        useCallback(() => {
            const fetchHistory = async () => {
                const history = await getHistory();
                setHistory(history)
            };
            fetchHistory();
        }, [])
    );

    // Variable for deleting full search history
    const deleteHistory = async () => {
        try {
            await AsyncStorage.removeItem("history"),
                setHistory([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Former searches</Text>

            {/*Returning the list of searches user has made*/}
            {/*Text to return if search history is empty*/}
            {history.length === 0 ? (
                <Text style={styles.noResults}>No searches found. </Text>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.search}>"{item}"</Text>
                            {/*Clickable icon for performing the search again*/}
                            <IconButton
                                style={styles.icon}
                                icon="chevron-right"
                                iconColor="white"
                                size={35}
                                onPress={() => { // Navigating with parameters needed for performing the search again
                                    navigation.navigate("Results", {
                                        query: item,
                                        spotifyCheck: true,
                                        deezerCheck: true,
                                        spotifyToken: spotifyToken,
                                    });
                                }}
                            />
                        </View>
                    )}
                />
            )}
            {history.length > 0 && (
                <DeleteButton onPress={() =>
                    Alert.alert(
                        "Clearing history", "This deletes all searches. Press Yes if you want to continue.",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Yes", onPress: deleteHistory }
                        ]


                    )}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#36454f",
    },
    header: {
        fontFamily: "Avenir-Oblique",
        fontSize: 30,
        marginVertical: 30,
        color: "#F2F3F4",
    },
    noResults: {
        fontFamily: "Avenir-Heavy",
        fontSize: 35,
        color: "white",
        margin: "auto",
    },
    item: {
        fontFamily: "Avenir-Oblique",
        fontSize: 20,
        height: 50,
        width: 300,
        flexDirection: "row",
        backgroundColor: "#242F36",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    search: {
        fontFamily: "Avenir-Oblique",
        fontSize: "20",
        color: "white",
    },
    icon: {
        position: "absolute",
        right: 5,
    },

})