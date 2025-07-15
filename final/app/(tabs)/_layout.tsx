import React from 'react'
import { Tabs, useSegments } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'

const tabs = [
  { name: 'home/index',     icon: 'home-outline',         label: 'Home' },
  { name: 'sleep/index',    icon: 'moon-outline',         label: 'Sleep' },
  { name: 'meditate/index', icon: 'water-outline',        label: 'Meditate' },
  { name: 'music/index',    icon: 'musical-notes-outline',label: 'Music' },
  { name: 'profile/index',  icon: 'person-outline',       label: 'Profile' },
]

export default function TabsLayout() {
  const { user } = useAuth()
  const username =
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'Profile'

  const segments = useSegments()
  const hideTabs = segments[segments.length - 1] === 'music'

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#8E97FD',
        tabBarInactiveTintColor: '#A0A3B1',
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: hideTabs
          ? { display: 'none' }
          : {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 0,
              elevation: 25,
              height: 100,
              paddingTop: 15,
              paddingBottom: 12,
            },
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 10,
          fontWeight: '900',
        },
      }}
    >
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.name === 'profile/index' ? username : t.label,
            tabBarIcon: ({ focused, size }) => (
              <View
                style={[
                  styles.iconWrapper,
                  focused && styles.iconWrapperActive,
                ]}
              >
                <Ionicons
                  name={t.icon as any}
                  size={size}
                  color={focused ? '#FFFFFF' : '#A0A3B1'}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperActive: {
    backgroundColor: '#8E97FD',
  },
})
