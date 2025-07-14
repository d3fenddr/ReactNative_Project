import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'

const Text: React.FC<TextProps> = ({ style, ...props }) => {
  const theme = useTheme()
  const color = theme === 'dark' ? '#FFFFFF' : '#333333'
  return (
    <RNText
      {...props}
      style={[{ color, fontFamily: 'HelveticaNeue-Medium' }, style]}
    />
  )
}

export default Text