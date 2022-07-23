import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import kamera from './screens/camera'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>OmegaLUL</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
