import { Text, Alert, StyleSheet, TouchableOpacity, View } from "react-native"

export default function SearchButton({ onPress }) {

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
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
        fontWeight:"300",
        fontFamily: "Damascus",
        color: "white",
    }
})