import { useFonts } from 'expo-font'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function FirstPage() {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/welcome-art.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentWrapper}>
        <View>
          <Text style={[styles.title, { fontFamily: 'HelveticaNeueMedium' }]}>We are what we do</Text>
          <Text style={[styles.subtitle, { fontFamily: 'HelveticaNeueMedium' }]}>Thousand of people are using Silent Moon{"\n"}for smalls meditation</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={[styles.buttonText, { fontFamily: 'HelveticaNeueMedium' }]}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { fontFamily: 'HelveticaNeueMedium' }]}>ALREADY HAVE AN ACCOUNT? </Text>
          <Link href="/(auth)/login" style={[styles.loginLink, { fontFamily: 'HelveticaNeueMedium' }]}>LOG IN</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    flex: 2,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#A1A4B2',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 45,
  },
  button: {
    backgroundColor: '#8A90F8',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#A1A4B2',
  },
  loginLink: {
    color: '#8E97FD',
    fontWeight: '500',
  },
})
