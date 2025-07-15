import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  isPlaying: boolean
  onTogglePlay: () => void
  onSkipBack: () => void
  onSkipForward: () => void
}

export default function MusicPlayerControls({
  isPlaying,
  onTogglePlay,
  onSkipBack,
  onSkipForward,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSkipBack}>
        <View style={styles.skipBtn}>
          <Ionicons name="play-back-outline" size={28} />
          <Text style={styles.skipText}>15s</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTogglePlay} style={styles.playPause}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={36}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSkipForward}>
        <View style={styles.skipBtn}>
          <Ionicons name="play-forward-outline" size={28} />
          <Text style={styles.skipText}>15s</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },
  playPause: {
    backgroundColor: '#333',
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 36,
  },
  skipBtn: {
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
})