import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'

type SocialButtonProps = {
  style?: ViewStyle | ViewStyle[]
  icon: React.ReactNode
  text: string
  textColor?: string
  onPress?: () => void
  fontFamily?: string
}

export default function SocialButton({
  style,
  icon,
  text,
  textColor = '#000',
  onPress,
  fontFamily,
}: SocialButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon}
      <Text style={[styles.text, { color: textColor, fontFamily }]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '700',
  },
})
