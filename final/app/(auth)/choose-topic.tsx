import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import ScreenWrapper from '@/components/ScreenWrapper'
import Button from '../../components/Button'
import TopicCard from '../../components/TopicCard'

import topics from '../../constants/topics'

const { width } = Dimensions.get('window')
const PADDING = 16
const CARD_WIDTH = (width - PADDING * 3) / 2
const CARD_HEIGHT = CARD_WIDTH * 1.1
const MAX_SELECTION = 3

export default function ChooseTopic() {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [fontsLoaded] = useFonts({
    HelveticaNeueMedium: require('../../assets/fonts/HelveticaNeueMedium.otf'),
  })
  if (!fontsLoaded) return null

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_SELECTION
          ? [...prev, id]
          : prev
    )
  }

  const handleNext = async () => {
    const labels = topics
      .filter(t => selectedIds.includes(t.id))
      .map(t => t.label)
    await AsyncStorage.setItem('meditationTopics', JSON.stringify(labels))
    router.push('./reminders')
  }

  return (
    <ScreenWrapper contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What Brings you</Text>
        <Text style={styles.subtitle}>to Silent Moon?</Text>
        <Text style={styles.helper}>choose a topic to focus on:</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {topics.map(topic => {
          const isSelected = selectedIds.includes(topic.id)
          return (
            <TopicCard
              key={topic.id}
              label={topic.label}
              bgColor={topic.bgColor}
              textColor={topic.textColor}
              selected={isSelected}
              onPress={() => handleSelect(topic.id)}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginBottom: PADDING,
              }}
            />
          )
        })}
      </ScrollView>

      {selectedIds.length === MAX_SELECTION && (
        <Button
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
        />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingHorizontal: PADDING,
    paddingTop: 32,
  },
  header: {
    marginVertical: 24,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 28,
    marginTop: 4,
  },
  helper: {
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  nextButton: {
    marginHorizontal: PADDING,
    marginBottom: 6,
  },
})