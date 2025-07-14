import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import FormInput from '../../components/FormInput'
import SocialButton from '../../components/SocialButton'
import { PURPLE } from '../../constants/colors'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginScreen() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })
  if (!fontsLoaded) return null

  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('All fields are required')
      return
    }
    try {
      await login(email, password)
      router.replace('/(tabs)/home')
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </Pressable>

      <View style={styles.inner}>
        <Text
          style={[
            styles.title,
            { fontFamily: 'HelveticaNeueMedium' },
          ]}
        >
          Welcome Back!
        </Text>

        <SocialButton
          style={{ backgroundColor: PURPLE }}
          icon={<FontAwesome name="facebook" size={20} color="#fff" />}
          text="CONTINUE WITH FACEBOOK"
          textColor="#fff"
          onPress={() => {/* FB login */}}
          fontFamily="HelveticaNeueMedium"
        />

        <SocialButton
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: PURPLE,
          }}
          icon={<FontAwesome name="google" size={22} color="#DB4437" />}
          text="CONTINUE WITH GOOGLE"
          textColor="#333"
          onPress={() => {/* Google login */}}
          fontFamily="HelveticaNeueMedium"
        />

        <Text
          style={[
            styles.orText,
            { fontFamily: 'HelveticaNeueMedium' },
          ]}
        >
          OR LOG IN WITH EMAIL
        </Text>

        {error ? (
          <Text
            style={[
              styles.error,
              { fontFamily: 'HelveticaNeueMedium' },
            ]}
          >
            {error}
          </Text>
        ) : null}

        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          fontFamily="HelveticaNeueMedium"
        />
        <FormInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          fontFamily="HelveticaNeueMedium"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text
            style={[
              styles.loginText,
              { fontFamily: 'HelveticaNeueMedium' },
            ]}
          >
            LOG IN
          </Text>
        </TouchableOpacity>

        <Pressable onPress={() => { /* forgot pass */ }}>
          <Text
            style={[
              styles.forgot,
              { fontFamily: 'HelveticaNeueMedium' },
            ]}
          >
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            { fontFamily: 'HelveticaNeueMedium' },
          ]}
        >
          Don’t have an account?{' '}
        </Text>
        <Link
          href="/(auth)/register"
          style={[
            styles.footerLink,
            { fontFamily: 'HelveticaNeueMedium' },
          ]}
        >
          SIGN UP
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 24 },
  back: { marginTop: 40, padding: 8 },
  inner: { flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 16,
    fontSize: 12,
    letterSpacing: 1,
  },
  error: { color: '#D00', textAlign: 'center', marginBottom: 8, fontSize: 13 },
  loginButton: {
    backgroundColor: PURPLE,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  loginText: { color: '#fff', fontSize: 16 },
  forgot: { textAlign: 'center', color: '#333', fontSize: 14 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
    marginBottom: 30,
  },
  footerText: { color: '#999', fontSize: 13 },
  footerLink: { color: PURPLE, fontWeight: '500', fontSize: 13 },
})