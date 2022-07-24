import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Test() {
  return (
    <View>
        <Text>
            HEHEHE
        </Text>
        <StatusBar style='auto'/>
    </View>
  );
}

