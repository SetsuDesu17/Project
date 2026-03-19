import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';

const faustSkill1 = require('../assets/ArdorBlossomFaust/Skill1.mp4');
const videoSource =
  faustSkill1;

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop=false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={false}
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.replay();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
