import {Text, View, SafeAreaView, ScrollView, Image, Button, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from 'react';


let brojBodova = 0;

export default function RewardsApp() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems0101 : 'center' }}>
            <Text> Your points: {brojBodova}</Text>

            <Text> Nagrada 1 </Text>
            <Image source={require('../images/camera.png')}/>
            <Button title="Preuzmi nagradu"/>
            
            <Text> Nagrada 2 </Text>
            <Image source={require('../images/camera.png')}/>
            <Button title="Preuzmi nagradu"/>

            <Text> Nagrada 3 </Text>
            <Image source={require('../images/camera.png')}/>
            <Button title="Preuzmi nagradu"/>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
