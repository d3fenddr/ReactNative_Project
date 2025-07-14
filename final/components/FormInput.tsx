import React from 'react'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'

type FormInputProps = TextInputProps & {
  fontFamily?: string
}

export default function FormInput({
  fontFamily,
  style,
  ...props
}: FormInputProps) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style, { fontFamily }]}
      placeholderTextColor="#999"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F1FB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
  },
})
