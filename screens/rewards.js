import {Text, View, SafeAreaView, Image, Button, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from 'react';


export default function RewardsApp() {
    return (
        <View>
            <Text> Nagrada 1 </Text>
            <Button title="Preuzmi nagradu"/>
            <Text> Nagrada 2 </Text>
            <Button title="Preuzmi nagradu"/>
            <Text> Nagrada 3 </Text>
            <Button title="Preuzmi nagradu"/>
            
        </View>
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
