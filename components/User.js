import { useState, useEffect } from "react";
import { StyleSheet, Image, Text, View } from "react-native";

export default function User({status, data}) {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [bio, setBio] = useState("");
    const [followers, setFollowers] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [blog, setBlog] = useState("");
    const [twitter, setTwitter] = useState("");

    useEffect(() => {
        if (status > 200)
            return;

        setAvatar(data.avatar_url);
        setName(data.name);
        setLogin(data.login);
        setBio(data.bio);
        setFollowers(data.followers);
        setCompany(data.company);
        setLocation(data.location);
        setEmail(data.email);
        setBlog(data.blog);
        setTwitter(data.twitter_username);
    }, [data]);

    // Helper for optional texts
    function TextIf({x, style=styles.text, children}) {
        return (x)
            ? <Text style={style}>{children}</Text>
            : null;
    }

    return (
        <View style={styles.container}>
            {status == 200
                ? <>
                    <Image
                        style={styles.image}
                        source={{
                            uri: avatar
                        }}
                    />

                    <TextIf x={name} style={styles.name}>{name}</TextIf>
                    <Text style={styles.login}>{login}</Text>
                    <TextIf x={bio}>{bio}</TextIf>
                    <Text style={styles.followers}>👥 {followers} followers</Text>
                    <TextIf x={company}>🏢 {company}</TextIf>
                    <TextIf x={location}>📍 {location}</TextIf>
                    <TextIf x={email}>📧 {email}</TextIf>
                    <TextIf x={blog}>🔗 {blog}</TextIf>
                    <TextIf x={twitter}>🐦 @{twitter}</TextIf>
                </>
                : <>
                    <Text style={styles.errorTitle}>
                        :(
                    </Text>
                    <Text style={styles.errorText}>
                        {`Failed to fetch user: ${status}`}
                    </Text>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100,
    },
    name: {
        fontSize: 50,
    },
    followers: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    login: {
        fontSize: 30,
        color: "gray",
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
    },
    errorTitle: {
        fontSize: 50,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 20,
        color: "#bbb",
    },
});
