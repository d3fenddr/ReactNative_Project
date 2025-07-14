import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native'

interface TopicCardProps {
  label: string
  bgColor: string
  textColor?: string
  borderRadius?: number
  selected?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export default function TopicCard({
  label,
  bgColor,
  textColor = '#fff',
  borderRadius = 16,
  selected,
  onPress,
  style,
}: TopicCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: bgColor, borderRadius },
        selected && styles.selected,
        style,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  selected: {
    opacity: 0.8,
    borderWidth: 2,
    borderColor: '#444',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
