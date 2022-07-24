import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

var bcrypt = require('bcryptjs');

export default function RegisterApp({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [username, setUser] = useState("");
    
    const [showError, setShowError] = useState(false);

    function sendRegisterInfo(){
        let hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        let data = {
            method: 'POST',
            body: JSON.stringify({
                name: ime,
                surname: prezime,
                email: email,
                passwordHash: hashedPassword,
                username: username
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
        }
        fetch('https://flinbusmerge.duckdns.org/api/register', data)
            .then( function (response){
                    return response.json();
                }
            )
            .then( function (data) {
                    if(data.success !== true) {
                        setShowError(true);
                    } else {
                        setShowError(false);
                        navigation.navigate("Login");
                    }
                }
            )
    } 

    return (
        <View style={styles.container}>

        <StatusBar style="auto" />

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#000000"
            onChangeText={(username) => setUser(username)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Ime"
            placeholderTextColor="#000000"
            onChangeText={(ime) => setIme(ime)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Prezime"
            placeholderTextColor="#000000"
            onChangeText={(Prezime) => setPrezime(prezime)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#000000"
            onChangeText={(email) => setEmail(email)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        </View>

        {
            showError &&
            (
                <View>
                    <Text>
                        Error registering
                    </Text>
                </View>
            )
        }
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={sendRegisterInfo}>
            <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
},

image: {
    marginBottom: 40,
},

inputView: {
    backgroundColor: "#A3F7B5",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "flex-start",
},

TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
},

forgot_button: {
    height: 30,
    marginBottom: 30,
},

loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#157145",
},

loginText: {
    color: "#fff"
}
});