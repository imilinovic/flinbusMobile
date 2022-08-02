import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import SITE_URL from "../consts";


var bcrypt = require('bcryptjs');

export default function LoginApp({ navigation }) {
    function sendLoginInfo(){
        let hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        let data = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                passwordHash: hashedPassword
            }),
            headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
            }
        }
        fetch(SITE_URL + '/api/login', data)
            .then( function (response){
                  return response.json();
                }
            )
            .then( function (data) {
                  if(data.success !== true) {
                    setShowError(true);
                  } else {
                    setShowError(false);
                    AsyncStorage.setItem("apiToken", data.apiToken).then(
                        function (res) {
                            navigation.navigate("Camera");
                        }
                    )
                  }
                }
            )
    }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#000000"
          onChangeText={(username) => setUsername(username)}
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
                  Error logging in
                </Text>
              </View>
          )
      }

      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress = { () => navigation.navigate("Register")}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress = { sendLoginInfo }>
        <Text style={styles.loginText}>LOGIN</Text>
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