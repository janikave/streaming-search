import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function DeleteButton( {onPress} ) {

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} onPress={onPress}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    view : {
        width: "100%",
        alignItems: "center",
        marginTop: 5,
    },
    button: {
        height: 50,
        width: 170,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "red",
    },
    buttonText: {
        fontSize: 22,
        fontWeight: "300",
        fontFamily: "Avenir-Oblique",
        color: "white",

    }
})