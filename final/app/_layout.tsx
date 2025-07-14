import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AuthProvider } from '../contexts/AuthContext'
import { OnboardingProvider } from '../contexts/OnboardingContext'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'HelveticaNeue-Medium': require('../assets/fonts/HelveticaNeueMedium.otf'),
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <OnboardingProvider>
          <Slot />
        </OnboardingProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}