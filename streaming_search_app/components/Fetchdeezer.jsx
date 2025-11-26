import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Alert, Linking } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";

export default function FetchDeezer({ route }) {

    const { query } = route.params; // Getting query for executing the fetch from Deezer API
    const [results, setResults] = useState([]); // Variable for setting results in a list
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!query) return;

        // Fetching the data from Deezer API
        const fetchDeezerResults = async () => {

            setLoading(true);

            try {
                const response = await fetch(`https://api.deezer.com/search?q=track:"${query}"`);
                if (!response.ok) throw new Error("Error in fetching data");
                const data = await response.json()

                setResults(data.data || []);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        };

        fetchDeezerResults(query);
    }, [query]);

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Results for </Text>
            <Text style={styles.search}>"{query}"</Text>

            { loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}

            {/* List for search results */}
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>

                        <Image
                            source={{ uri: item.album.cover_medium }}
                            style={styles.image}
                        />
                        <View style={styles.info}>
                            <Text style={styles.track}>{item.title}</Text>
                            <Text style={styles.artist}>{item.artist?.name}</Text>
                        </View>
                        {/* Clickable icon for the track's link to the streaming service */}
                        <IconButton
                            style={styles.icon}
                            icon="music"
                            iconColor="white"
                            size={45}
                            onPress={() => {
                                const deezerUrl = item.link;

                                if (deezerUrl) {
                                    Linking.openURL(deezerUrl);
                                } else {
                                    Alert.alert("Link not available.");
                                }

                            }}
                        />
                    </View>
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
        backgroundColor: "#36454f",
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
        backgroundColor: "#a238ff",
        borderRadius: 5,
        textAlign: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5,
        overflow: "scroll",
    },
    info: {
        marginLeft: 15,
        maxWidth: "45%",
    },
    track: {
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Avenir-Heavy",
        color: "white",
    },
    artist: {
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Avenir-Oblique",
        color: "white",
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    icon: {
        position: "absolute",
        right: 2,
    },
    loading : {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    }
})