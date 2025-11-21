import { useEffect, useState} from "react";
import { FlatList, StyleSheet, Text, View, Image, Alert } from "react-native";
import { IconButton } from "react-native-paper";

export default function DeezerFetch({ route }) {

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
            <Text style={styles.header}>Deezer results for: </Text>
            <Text style={styles.search}>{query}</Text>

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
                            onPress={() => Alert.alert("PRESSED")}
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
    header: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "400",
        fontFamily: "Damascus",
        color: "#a238ff",
    },
    search: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 25,
        fontWeight: "400",
        fontFamily: "Damascus",
        color: "#36454f",
    },
    item: {
        height: 120,
        width: 350,
        flexDirection: "row",
        margin: 5,
        paddingLeft: 5,
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
        width: 90,
        height: 90,
        marginLeft: 5,
        borderRadius: 5,
    },
    icon: {
        position: "absolute",
        right: 3,
    }
})