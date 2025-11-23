import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Alert, Linking } from "react-native";
import { IconButton } from "react-native-paper";

export default function FetchDeezer({ route }) {

    const { query } = route.params;
    const [results, setResults] = useState([]);

    useEffect(() => {

        if (!query) return;

        const fetchDeezerResults = async (query) => {
            try {
                const response = await fetch(`https://api.deezer.com/search?q=track:"${query}"`);
                if (!response.ok) throw new Error("Error in fetching data");
                const data = await response.json()

                setResults(data.data || []);
            } catch (err) {
                console.error(err)
            }
        };

        fetchDeezerResults(query);
    }, [query]);

    return (
        <View style={styles.container}>

            <View style={styles.searchinfo}>
                <Text style={styles.header}>Searching </Text>
                <Text style={styles.search}>"{query}"</Text>
            </View>

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
                        </ View>
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

    },
    searchinfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    header: {
        width: "50%",
        fontSize: 30,
        fontWeight: "400",
        fontFamily: "Damascus",
        color: "#36454f",
        textAlign: "center",
    },
    search: {
        width: "50%",
        fontSize: 25,
        fontWeight: "400",
        fontFamily: "Damascus",
        color: "#36454f",
    },
    item: {
        height: 100,
        width: 350,
        flexDirection: "row",
        margin: 5,
        backgroundColor: "#a238ff",
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5,
    },
    info: {
        marginLeft: 15,
        maxWidth: "50%",
    },
    track: {
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "Damascus",
        color: "white",
    },
    artist: {
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Damascus",
        color: "white"
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    icon: {
        position: "absolute",
        right: 3,
    }
})