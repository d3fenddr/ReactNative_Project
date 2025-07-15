import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font'

import SocialButton from '../../components/SocialButton'
import FormInput from '../../components/FormInput'
import { LIGHT_BG, PURPLE } from '../../constants/colors'
import { useAuth } from '../../contexts/AuthContext'

export default function RegisterScreen() {
  const router = useRouter()
  const { register } = useAuth()

  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })
  if (!fontsLoaded) return null

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e)
  const isValidUsername = (u: string) => u.trim().length >= 3
  const isValidPassword = (p: string) => p.length >= 6

  const handleSignUp = async () => {
    setError('')
    if (!isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password)) {
      setError('Please fill all fields correctly')
      return
    }
    if (!acceptPolicy) {
      setError('You must accept Privacy Policy')
      return
    }
    try {
      await register(username, email, password)
      router.replace('/(auth)/welcome')
    } catch (err: any) {
      if (err.message.includes('already registered')) {
        setError('This email is already registered. Please log in instead.')
      } else {
        setError(err.message || 'Registration failed')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </Pressable>

      <View style={styles.inner}>
        <Text style={[styles.title, { fontFamily: 'HelveticaNeueMedium' }]}>Create your account</Text>

        <SocialButton
          style={{ backgroundColor: PURPLE }}
          icon={<FontAwesome name="facebook" size={20} color="#fff" />}
          text="CONTINUE WITH FACEBOOK"
          textColor="#fff"
          fontFamily="HelveticaNeueMedium"
          onPress={() => {}}
        />

        <SocialButton
          style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: PURPLE }}
          icon={<FontAwesome name="google" size={20} color="#DB4437" />}
          text="CONTINUE WITH GOOGLE"
          textColor="#333"
          fontFamily="HelveticaNeueMedium"
          onPress={() => {}}
        />

        <Text style={[styles.orText, { fontFamily: 'HelveticaNeueMedium' }]}>OR SIGN UP WITH EMAIL</Text>

        {error ? <Text style={[styles.error, { fontFamily: 'HelveticaNeueMedium' }]}>{error}</Text> : null}

        <View style={styles.inputWrapper}>
          <FormInput
            style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 0 }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            fontFamily="HelveticaNeueMedium"
          />
          {isValidUsername(username) && (
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          )}
        </View>

        <View style={styles.inputWrapper}>
          <FormInput
            style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 0 }}
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            fontFamily="HelveticaNeueMedium"
          />
          {isValidEmail(email) && (
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          )}
        </View>

        <View style={styles.inputWrapper}>
          <FormInput
            style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 0 }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            fontFamily="HelveticaNeueMedium"
          />
          <Pressable onPress={() => setShowPass(p => !p)}>
            <Ionicons name={showPass ? 'eye' : 'eye-off'} size={20} color="#666" />
          </Pressable>
        </View>

        <View style={styles.policyRow}>
          <Pressable
            onPress={() => setAcceptPolicy(p => !p)}
            style={[
              styles.checkbox,
              acceptPolicy && { backgroundColor: PURPLE, borderColor: PURPLE },
            ]}
          >
            {acceptPolicy && <Ionicons name="checkmark" size={16} color="#fff" />}
          </Pressable>
          <Text style={[styles.policyText, { fontFamily: 'HelveticaNeueMedium' }]}>I have read the{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://google.com')}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, !acceptPolicy && styles.disabled]}
          onPress={handleSignUp}
          disabled={!acceptPolicy}
        >
          <Text style={[styles.loginText, { fontFamily: 'HelveticaNeueMedium' }]}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    paddingHorizontal: 24 
  },
  back: { 
    marginTop: 40, 
    padding: 8 
  },
  inner: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 28, 
    textAlign: 'center', 
    marginBottom: 40 
  },
  orText: { 
    textAlign: 'center', 
    color: '#999', 
    marginVertical: 16, 
    fontSize: 12, 
    letterSpacing: 1 
  },
  error: { 
    color: '#D00', 
    textAlign: 'center', 
    marginBottom: 8, 
    fontSize: 13 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  policyRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  checkbox: { 
    width: 20, 
    height: 20, 
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: '#999', 
    marginRight: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  policyText: { 
    fontSize: 14, 
    color: '#666', 
    flexShrink: 1
  },
  link: { 
    color: PURPLE, 
    textDecorationLine: 'underline' 
  },
  loginButton: { 
    backgroundColor: PURPLE, 
    borderRadius: 24, 
    paddingVertical: 14, 
    alignItems: 'center' 
  },
  loginText: { 
    color: '#fff', 
    fontSize: 16 
  },
  disabled: { 
    opacity: 0.5 
  },
})