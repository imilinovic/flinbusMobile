import {Text, View, SafeAreaView, Image, Button, StyleSheet, AsyncStorage} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from 'react';
import bcrypt from "bcryptjs";


export default function CameraApp() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    async function sendPhoto() {
        let apiToken = await AsyncStorage.getItem("apiToken");
        let data = {
            method: 'POST',
            body: JSON.stringify({
                apiToken: apiToken,
                image: photo.base64
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
                        alert("Error response from server!");
                    } else {

                        navigation.navigate("Camera");
                    }
                }
            )
    }

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
            return <Text>Requesting permissions...</Text>
        } else if (!hasCameraPermission) {
            return <Text>Permission for camera not granted. Please change this in settings.</Text>
        }

        let takePic = async () => {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };

            try 
            {
                let newPhoto = await cameraRef.current.takePictureAsync(options);
                setPhoto(newPhoto);
            } catch(exception) {
                let newPhoto = await cameraRef.current.takePictureAsync(options);
                setPhoto(newPhoto);
            }
         
            await sendPhoto();
        };

        if (photo) {
            let savePhoto = () => {
                MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                    setPhoto(undefined);
                });
            };

            return (
                <SafeAreaView style={styles.container}>
                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                    {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto /* TU IDE FUNKCIJA ZA SLANJE SLIKE PRIJE I POSLIJE*/} /> : undefined}
                    <Button title="Ping" /*onPress = {posaljiPing() OVO JE FUNKCIJA ZA SLANJE PINGA}*/ />
                    <Button title="Discard" onPress={() => setPhoto(undefined)} />

                </SafeAreaView>
            );
        }

        return (
            <Camera style={styles.container} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <Button title="Take Pic" onPress={takePic} />
                    <StatusBar/>
                </View>
            </Camera>
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
