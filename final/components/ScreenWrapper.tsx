import React from 'react'
import { SafeAreaView, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface ScreenWrapperProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
}

export default function ScreenWrapper({
  children,
  style,
  contentStyle,
}: ScreenWrapperProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView
        contentContainerStyle={[styles.content, contentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 5,
  },
  content: {
    flexGrow: 1,
    padding: 12,
  },
})
