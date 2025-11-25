import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import SpotifyToken from "./Spotifytoken";

export default function SearchHistory({ navigation }) {

    const [history, setHistory] = useState([]);
    const [spotifyToken, setSpotifyToken] = useState("");


    useEffect(() => {
        const fetchSpotifyToken = async () => {
            const tok = await SpotifyToken();
            setSpotifyToken(tok);
        };
        fetchSpotifyToken();
    }, []);

    const getHistory = async () => {
        const searchHistoryData = await AsyncStorage.getItem("history");
        return searchHistoryData ? JSON.parse(searchHistoryData) : [];
    }

    useFocusEffect(
        useCallback(() => {
            const fetchHistory = async () => {
                const history = await getHistory();
                setHistory(history)
            };
            fetchHistory();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Former searches</Text>

            {history.length === 0 ? (
                <Text style={styles.noResults}>No searches found.</Text>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.search}>"{item}"</Text>
                            <IconButton
                                style={styles.icon}
                                icon="chevron-right"
                                iconColor="white"
                                size={35}
                                onPress={() => {
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
        backgroundColor: "#36454f",
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
    }

})