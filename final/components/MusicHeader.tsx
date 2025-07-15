import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function MusicHeader() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.closeBtn}>
        <Ionicons name="close" size={32} color="#333" />
      </TouchableOpacity>
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => setLiked(p => !p)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={30}
            color={liked ? '#FF0000' : '#333'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="download-outline"
            size={28}
            color="#333"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 32,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    zIndex: 10,
  },
  closeBtn: {},
  topRight: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
})