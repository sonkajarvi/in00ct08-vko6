import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, Button, TextInput, View } from "react-native";

export default function Search({onPress, initial}) {
    const [input, setInput] = useState(initial);

    useEffect(() => {
        if (typeof initial === "string" && initial.length > 0) {
            if (onPress(input))
                setInput("");
        }
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Search for GitHub user..."
                onEndEditing={() => {
                    if (onPress(input))
                        setInput("");
                }}
            />
            <Button
                title="Search"
                onPress={() => {
                    if (onPress(input)) {
                        setInput("");
                        Keyboard.dismiss();
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 0,
        margin: 20,
    },
    input: {
        height: 40,
        flexGrow: 1,
        fontSize: 18,
        backgroundColor: "#eee",
        borderRadius: 10,
        paddingLeft: 10,
    },
});