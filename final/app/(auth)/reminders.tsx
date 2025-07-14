import React, { useState } from 'react'
import { Alert, Platform, Pressable, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font'

import Button from '../../components/Button'
import ScreenWrapper from '../../components/ScreenWrapper'
import Text from '../../components/Text'

const WEEKDAYS = [
  { label: 'SU', value: 0 },
  { label: 'M',  value: 1 },
  { label: 'T',  value: 2 },
  { label: 'W',  value: 3 },
  { label: 'TH', value: 4 },
  { label: 'F',  value: 5 },
  { label: 'S',  value: 6 },
]

export default function Reminders() {
  const router = useRouter()
  const [time, setTime] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState<boolean>(Platform.OS === 'ios')
  const [days, setDays] = useState<number[]>([])

  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })
  if (!fontsLoaded) return null

  const toggleDay = (day: number) => {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const onChangeTime = (_: any, selected?: Date) => {
    const current = selected || time
    setShowPicker(Platform.OS === 'ios')
    setTime(current)
  }

  const save = async () => {
    if (days.length === 0) {
      Alert.alert(
        'Select at least one day',
        'We recommend picking at least five days.'
      )
      return
    }
    try {
      await AsyncStorage.setItem('reminderTime', time.toISOString())
      await AsyncStorage.setItem('reminderDays', JSON.stringify(days))
      router.push('../tabs/home')
    } catch {
      Alert.alert('Error', 'Failed to save reminders.')
    }
  }

  const skip = () => {
    router.push('../(tabs)/home')
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { fontFamily: 'HelveticaNeueMedium' }]}>What time would you like to meditate?</Text>
        <Text style={[styles.subtitle, { fontFamily: 'HelveticaNeueMedium' }]}>Any time you can choose but we recommend first thing in the morning.</Text>

        <View style={styles.pickerWrapper}>
          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="spinner"
              onChange={onChangeTime}
              style={styles.picker}
            />
          )}
          {Platform.OS !== 'ios' && (
            <Pressable
              onPress={() => setShowPicker(v => !v)}
              style={styles.openPickerButton}
            >
              <Text style={[styles.openPickerText, { fontFamily: 'HelveticaNeueMedium' }]}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.title, { marginTop: 32, fontFamily: 'HelveticaNeueMedium' }]}>Which day would you like to meditate</Text>
        <Text style={[styles.subtitle, { fontFamily: 'HelveticaNeueMedium' }]}>Every day is best, but we recommend picking at least five.</Text>

        <View style={styles.daysRow}>
          {WEEKDAYS.map(d => {
            const selected = days.includes(d.value)
            return (
              <Pressable
                key={d.value}
                onPress={() => toggleDay(d.value)}
                style={[
                  styles.dayButton,
                  selected && styles.dayButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    selected && styles.dayLabelSelected,
                    { fontFamily: 'HelveticaNeueMedium' },
                  ]}
                >
                  {d.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Button title="SAVE" onPress={save} style={styles.saveButton} textStyle={{ fontFamily: 'HelveticaNeueMedium' }} />
        <Pressable onPress={skip} style={styles.skipButton}>
          <Text style={[styles.skipText, { fontFamily: 'HelveticaNeueMedium' }]}>NO THANKS</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    height: Platform.OS === 'ios' ? 260 : 60,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 260,
  },
  openPickerButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  openPickerText: {
    fontSize: 18,
    color: '#333',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#333',
  },
  dayLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  dayLabelSelected: {
    color: '#fff',
  },
  saveButton: {
    marginTop: 2,
    borderRadius: 48,
  },
  skipButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  skipText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
})