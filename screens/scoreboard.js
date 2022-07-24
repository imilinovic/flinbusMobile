import {Text, View, SafeAreaView, Image, Button, StyleSheet, AsyncStorage} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from 'react';
import bcrypt from "bcryptjs";

export default function previewApp() {
    const [image, setImage] = useState();

    AsyncStorage.getItem("slika").then(
        function (res) {
            setImage(res);
        }
    )

    return (
        <View>
            <Image src={image}/>
            <Button title="Povratak na kameru" onPress={ () => {navigator.navigateO("camera")}}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});
