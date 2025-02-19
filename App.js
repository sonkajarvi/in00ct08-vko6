import { useState, useCallback } from "react";
import { StyleSheet, RefreshControl, ScrollView, View } from "react-native";
import Constants from "expo-constants";
import User from "./components/User.js";
import Search from "./components/Search.js";

export default function App() {
    const [data, setData] = useState({});
    const [status, setStatus] = useState(0);
    const [username, setUsername] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    async function search(user) {
        if (user.length === 0)
            return false;

        setUsername("");
        const response = await fetch(`https://api.github.com/users/${user}`);

        setStatus(response.status);
        if (!response.ok)
            return false;

        setData((await response.json()));
        setUsername(user);
        return true;
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        search(username);
        setRefreshing(false);
    });

    return (
        <View style={styles.container}>
            <Search
                initial="torvalds"
                onPress={search}
            />
            <ScrollView
                refreshControl={
                    status == 200
                        ? <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        : null
                }
            >
                <User status={status} data={data} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Constants.statusBarHeight,
    },
});
