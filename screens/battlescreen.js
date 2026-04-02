import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import animation from '../assets/Codes/animations.js';
import animStyle from '../assets/Codes/animationStyle.js'

const TitleScreen = () => {
 
    const navigation = useNavigation();


    const [playerIsIdle, setPlayerStatus] = useState(true);
    const [currentAnimation, setCurrentAnimation] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);

    const animations = new animation();

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const player = useVideoPlayer(currentAnimation, player => {
        player.loop=false;
        player.replay();
      });

    const skill = async (player, animationIndex, delayTime, style, pauseTime) => {
        setPlayerStatus(!playerIsIdle);
        setCurrentAnimation(animations.getAnim(animationIndex));
        setCurrentStyle(style);
        player.replay();
        await delay(delayTime)
        setPlayerStatus(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Battle Screen</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TitleScreen')}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.playerContainer}>
                {playerIsIdle ? (
                    <Image source={animations.getAnim(0)} style={animStyle.idle} />
                ) : (
                    <VideoView
                        style={currentStyle}
                        player={player}
                        nativeControls={false}
                        resizeMode="contain"
                    />
                )}
                <Text style={styles.hp}>Player HP: 100</Text>  
            </View>
            
            
            <View style={styles.skillContainer}>
                                                     
                                                                         
                <TouchableOpacity style={styles.skill1Button} onPress={() => skill(player, 1, 1500, animStyle.skill1, 1000)}>
                    <Text style={styles.backButtonText}>Skill 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill1_2Button} onPress={() => skill(player, 1, 2100, animStyle.skill1, 1)}>
                    <Text style={styles.backButtonText}>Skill 1.2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill2Button} onPress={() => skill(player, 2, 1400, animStyle.skill2, 1)}>
                    <Text style={styles.backButtonText}>Skill 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill3Button} onPress={() => skill(player, 3, 1400, animStyle.skill3, 1)}>
                    <Text style={styles.backButtonText}>Skill 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skill3_2Button} onPress={() => skill(player, 3, 2700, animStyle.skill3, 1)}>
                    <Text style={styles.backButtonText}>Skill 3.2</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b3b3b3',
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
    playerContainer: {
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    hp: {
        position: 'absolute',
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
    skill1Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 200,
        top: 20,
    },
    skill1_2Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 200,
        top: 50,
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
    skill3_2Button: {
        backgroundColor: '#0866FF',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 8,
        width: 80,
        left: 460,
        top: 50,
    },  
    
    
});

export default TitleScreen;

