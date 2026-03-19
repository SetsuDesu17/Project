import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEventListener } from 'expo';

const TitleScreen = () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const navigation = useNavigation();
    const idleGIFFaust = require('../assets/ArdorBlossomFaust/Idle.gif');
    const skill1Faust = require('../assets/ArdorBlossomFaust/Skill1.mp4')
    const skill2Faust = require('../assets/ArdorBlossomFaust/Skill2.mp4')
    const skill3Faust = require('../assets/ArdorBlossomFaust/Skill3.mp4')

    const [playerIsIdle, setPlayerStatus] = useState(true);
    const [currentAnimation, setCurrentAnimation] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);

    const player = useVideoPlayer(currentAnimation, player => {
        player.loop=false;
        player.replay();
      });

    const skill = (player, animation, delayTime, styleVersion) => {
        setPlayerStatus(!playerIsIdle);
        setCurrentAnimation(animation);
        setCurrentStyle(styleVersion);
        player.replay();
        delay(delayTime).then(() => {
            setPlayerStatus(true);
        });
    };

    
    const attack = () => {

        return (
            <VideoView
                style={currentStyle}
                player={player}
                nativeControls={false}
                resizeMode="contain"
            />
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Battle Screen</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TitleScreen')}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
      
            {playerIsIdle ? (
                <Image source={idleGIFFaust} style={styles.playerCharacter} />
            ) : (
                attack()
            )}
            
            <View style={styles.skillContainer}>
                <Text>Player HP: 100</Text>
                <TouchableOpacity style={styles.skill1Button} onPress={() => skill(player, skill1Faust, 1200, styles.skill1)}>
                    <Text style={styles.backButtonText}>Skill 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill2Button} onPress={() => skill(player, skill2Faust, 3000, styles.skill2)}>
                    <Text style={styles.backButtonText}>Skill 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill3Button} onPress={() => skill(player, skill3Faust, 4000, styles.skill3)}>
                    <Text style={styles.backButtonText}>Skill 3</Text>
                </TouchableOpacity>
            </View>
        
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
    titleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        position: 'absolute',
        top: 40,
        left: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        right: 20,
        top: 45,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skillContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    playerCharacter: {
        position: 'absolute',
        width: '60',
        resizeMode: 'contain',
        left: 140,
    },
    skill1: {
        resizeMode: 'contain',
        width: 120,
        height: 150,
        left: 120,
    },
    skill2: {
        resizeMode: 'contain',
        width: 350,
        height: 350,
        left: 120,
    },
    skill3: {
        resizeMode: 'contain',
        width: 500,
        height: 550,
        left: 100,
    },
    skill1Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 200,
        top: 20,
    },
    skill2Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 330,
        top: 20,
    },
    skill3Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 460,
        top: 20,
    },  
    
    
});

export default TitleScreen;

