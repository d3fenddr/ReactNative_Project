import React from 'react'
import { Redirect } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'

export default function Index() {
  const { token, loading } = useAuth()

  if (loading) {
    return null
  }

  return token
    ? <Redirect href="/(tabs)/home" />
    : <Redirect href="/(auth)/firstpage" />
}