import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  title: string
  subtitle: string
}

export default function MusicTitle({ title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 280,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 34,
    color: '#3F414E',
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 14,
    color: '#A0A3B1',
    marginTop: 4,
  },
})
