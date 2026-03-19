import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TitleScreen = () => {
  const navigation = useNavigation();
  const skill1Faust = require('../assets/ArdorBlossomFaust/Skill1.mp4')

  return (
    <View style={styles.container}>
      <Text>Design me please! Kirk! I NEED THIS!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('BattleScreen')}>
        <Text>Go to Battle Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Test')}>
        <Text>Go to Test Screen</Text>
      </TouchableOpacity>
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
  video: {
    width: 300,
    height: 200,
  },
});

export default TitleScreen;
