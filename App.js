import { Text, StyleSheet, View, Button, AppRegistry} from 'react-native';
import CameraApp from "./screens/camera";
import LoginApp from "./screens/login"; 
//import RegisterApp from './screens/register';
import HomeApp from './screens/home';
import * as React from 'react';
//import Navigator from './routes/homeRoutes'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Test from './screens/test'
import RegisterApp from './screens/register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RewardsApp from './screens/rewards';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function forceUpdate()
{
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>    
        <Stack.Screen
            name = "Register"
            component={RegisterApp}
        />
      </Stack.Navigator>
 
      <Tab.Navigator
        options={{
          tabBarIcon: ({focused}) => <SettingsIcon color={focused ? forceUpdate : 'blue'} />
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login" component={LoginApp} />
        <Tab.Screen name="Camera" component={CameraApp} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="Rewards" component={RewardsApp} />
      </Tab.Navigator>

    </NavigationContainer>
  )};
/*    <NavigationContainer>
    <Stack.Navigator>    
        
          <Stack.Screen
            name = "Camera"
            component={CameraApp}
        />
        <Stack.Screen
            name = "Register"
            component={RegisterApp}
        />
        
    </Stack.Navigator>
</NavigationContainer>
  );
}

/*const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code }
    </NavigationContainer>
  );
};

export default App;*/
