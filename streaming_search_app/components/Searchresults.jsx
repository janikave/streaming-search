import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SpotifyToken from "./Spotifytoken";

export default function SearchResults( { route } ) {

    const { query } = route.params;
    const [results, setResults] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            const tok = await SpotifyToken();
            setToken(tok)
        }
        fetchToken();
    }, []);

    useEffect(() => {

        const fetchResults = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Error in fetching the data");

            const data = await response.json();
            setResults(data.tracks?.items || []);
            } catch (err) {
                console.error(err)
            }
        };

        fetchResults();
    }, [token, query]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{query}:</Text>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text>{item.name} - {item.artists?.[0]?.name}</Text>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "500",
        color: "steelblue",
        
    }
})