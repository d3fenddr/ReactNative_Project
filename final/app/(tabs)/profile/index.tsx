import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../../contexts/AuthContext'

export default function ProfileScreen() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const name = user?.user_metadata?.username || user?.email || 'User'
  const email = user?.email || 'no-email@example.com'

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/(auth)/firstpage')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: handleLogout },
      ],
      { cancelable: true }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.info}>Username: {name}</Text>
        <Text style={styles.info}>Email: {email}</Text>
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8E97FD',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: '#5A6175',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFECCC',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E97FD',
  },
})