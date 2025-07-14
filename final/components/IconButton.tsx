import React from 'react'
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IconButtonProps {
  name: React.ComponentProps<typeof Ionicons>['name']
  size?: number
  color?: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const IconButton: React.FC<IconButtonProps> = ({ name, size = 24, color = '#333', onPress, style }) => (
  <Pressable onPress={onPress} style={[styles.wrapper, style]}>
    <Ionicons name={name} size={size} color={color} />
  </Pressable>
)

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default IconButton