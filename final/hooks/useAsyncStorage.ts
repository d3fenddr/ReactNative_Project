import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export function useAsyncStorage<T>(
  key: string,
  initialValue: T
): [T | null, (val: T) => Promise<void>] {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((json) => {
        if (json != null) {
          setValue(JSON.parse(json) as T)
        } else {
          setValue(initialValue)
        }
      })
      .catch(console.error)
  }, [key])

  const saveValue = async (val: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val))
      setValue(val)
    } catch (e) {
      console.error('AsyncStorage save error:', e)
    }
  }

  return [value, saveValue]
}