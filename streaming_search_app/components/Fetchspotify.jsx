import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Alert, ScrollView, Linking } from "react-native";
import { IconButton } from "react-native-paper";

export default function FetchSpotify({ route }) {


    const { query, spotifyToken } = route.params;
    const [results, setResults] = useState([]);
    useEffect(() => {

        if (!spotifyToken) return;
        if (!query) return;

        const fetchResults = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
                    headers: {
                        Authorization: `Bearer ${spotifyToken}`,
                    },
                }
                );

                console.log("Status:", response.status);

                if (!response.ok) throw new Error("Error in fetching the data");

                const data = await response.json();
                setResults(data.tracks?.items || []);
            } catch (err) {
                console.error("ERROR", err)
            }
        };

        fetchResults();
    }, [spotifyToken, query]);

    return (
        <View style={styles.container}>
                <Text style={styles.header}>Results for</Text>
                <Text style={styles.search}>"{query}"</Text>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>

                        <Image
                            source={{ uri: item.album.images[0]?.url }}
                            style={styles.image}
                        />
                        <View style={styles.info}>
                            <Text style={styles.track}>{item.name}</Text>
                            <Text style={styles.artist}>{item.artists?.[0]?.name}</Text>
                        </View>
                        <IconButton
                            style={styles.icon}
                            icon="music"
                            iconColor="white"
                            size={45}
                            onPress={() => {
                                const spotifyUrl = item.external_urls?.spotify;
                                
                                if (spotifyUrl) {
                                    Linking.openURL(spotifyUrl).catch(err => console.error("Unable to open the URL:", err));
                                } else {
                                    Alert.alert("Link not available.");
                                }
                            }}
                        />
                    </ View>
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
        backgroundColor: "#36454f"

    },
    header: {
        width: "100%",
        fontSize: 30,
        fontWeight: "400",
        fontFamily: "Avenir-Oblique",
        color: "white",
        textAlign: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    search: {
        width: "90%",
        fontSize: 25,
        fontWeight: "400",
        fontFamily: "Avenir-Oblique",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#8CA2B0",
    },
    item: {
        height: 100,
        width: 350,
        flexDirection: "row",
        margin: 5,
        backgroundColor: "#1DB954",
        borderRadius: 5,
        textAlign: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    info: {
        marginLeft: 20,
        maxWidth: "45%",
    },
    track: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Avenir-Heavy",
        color: "white",
    },
    artist: {
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Avenir-Oblique",
        color: "white"
    },
    image: {
        left: 0,
        width: 100,
        height: 100,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    icon: {
        position: "absolute",
        right: 2,
    }
})