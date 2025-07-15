import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useMusicPlayer } from '../../../hooks/useMusicPlayer'
import MusicHeader from '../../../components/MusicHeader'
import MusicTitle from '../../../components/MusicTitle'
import MusicPlayerControls from '../../../components/MusicPlayerControls'
import MusicSlider from '../../../components/MusicSlider'

const AUDIO_SOURCE = require('../../../assets/music/focus-attention.mp3')

export default function MusicScreen() {
  const router = useRouter()
  const {
    isPlaying,
    position,
    duration,
    togglePlay,
    skip,
    seekTo,
    formatTime,
  } = useMusicPlayer(AUDIO_SOURCE)

  return (
    <SafeAreaView style={styles.container}>
      <MusicHeader />
      <MusicTitle title="Focus Attention" subtitle="7 DAYS OF CALM" />
      <MusicPlayerControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onSkipBack={() => skip(-15)}
        onSkipForward={() => skip(15)}
      />
      <MusicSlider
        position={position}
        duration={duration}
        onSeek={seekTo}
        formatTime={formatTime}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
  },
})
