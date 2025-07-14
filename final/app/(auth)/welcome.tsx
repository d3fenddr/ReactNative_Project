import React from 'react'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useAuth } from '../../contexts/AuthContext'

import LogoSvg from '../../assets/images/logo.svg'
import MeditationArtSvg from '../../assets/images/meditation-art.svg'

export default function Welcome() {
  const router = useRouter()
  const { user } = useAuth()
  const emailName = user?.email?.split('@')[0] ?? ''
  const name = user?.user_metadata?.username ?? emailName ?? 'User'

  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })
  if (!fontsLoaded) return null

  return (
    <SafeAreaView style={styles.container}>

      <LogoSvg width={160} height={80} />

      <View style={styles.header}>
        <Text style={styles.title}>Hi {name}, Welcome</Text>
        <Text style={styles.subtitle}>to Silent Moon</Text>
        <Text style={styles.text}>
          Explore the app, find some peace of mind{ '\n' }to prepare for meditation.
        </Text>
      </View>

      <MeditationArtSvg width={Dimensions.get('window').width * 0.8} height={200} style={styles.image} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('./choose-topic')}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

import { Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C96FF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 30,
    color: '#FFECCC',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 20,
    color: '#FFECCC',
    marginBottom: 32,
  },
  text: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 16,
    color: '#EBEAEC',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
  },
  image: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#EBEAEC',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    marginBottom: 45,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 16,
    color: '#3F414E',
  },
})