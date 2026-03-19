import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleScreen from './screens/titlescreen'; 
import BattleScreen from './screens/battlescreen';
import test from './screens/test';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TitleScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TitleScreen" component={TitleScreen} />
        <Stack.Screen name="BattleScreen" component={BattleScreen} />
        <Stack.Screen name="Test" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}