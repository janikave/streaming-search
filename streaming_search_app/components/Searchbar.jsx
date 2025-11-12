import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
export default function SearchBar() {
    
    const [search, setSearch] = useState("");



    return(
        <View style={styles.page}>
            <Text style={styles.header}>Search for music</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for song, album or an artist"
                onChangeText={search => setSearch(search)}
                value={search} />
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert ("Button pressed")}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    )
} 
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
    },
    header: {
        fontSize: 25,
        fontWeight: 700,
        paddingBottom: 30,
        color: 'steelblue'
    },
    searchInput: {
        height: 50,
        width: 300,
        marginBottom: 30,
        padding: 30,
        borderWidth: 1,
        borderRadius: 5,
        opacity: 0.5,
        color: "black",
        backgroundColor: "white",
    },
    button: {
        height: 50,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#36454f',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 500,
        color: "white",
    }

})