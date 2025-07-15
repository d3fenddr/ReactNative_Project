import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Slider from '@react-native-community/slider'

const { width } = Dimensions.get('window')

interface Props {
  position: number
  duration: number
  onSeek: (val: number) => void
  formatTime: (sec: number) => string
}

export default function MusicSlider({
  position,
  duration,
  onSeek,
  formatTime,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(position)}</Text>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={onSeek}
        thumbTintColor="#3F414E"
        minimumTrackTintColor="#3F414E"
        maximumTrackTintColor="#A0A3B1"
      />
      <Text style={styles.time}>{formatTime(duration)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
  time: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: '#333',
    width: 40,
    textAlign: 'center',
  },
})