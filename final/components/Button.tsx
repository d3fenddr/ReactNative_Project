import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

export type ButtonProps = {
  title?: string
  onPress: () => void
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  variant?: 'primary' | 'secondary'
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const buttonVariantStyle =
    variant === 'secondary' ? styles.secondaryButton : styles.primaryButton
  const textVariantStyle =
    variant === 'secondary' ? styles.secondaryText : styles.primaryText

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseButton, buttonVariantStyle, style]}
    >
      {children ? (
        children
      ) : (
        title && (
          <Text style={[styles.baseText, textVariantStyle, textStyle]}>
            {title}
          </Text>
        )
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8E97FD',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8E97FD',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#8E97FD',
  },
})