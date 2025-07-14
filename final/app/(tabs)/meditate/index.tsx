import React, { useState } from 'react'
import type { ComponentProps } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

const fontMap = {
  HelveticaNeueMedium: require('../../../assets/fonts/HelveticaNeueMedium.otf'),
}

type IconName = ComponentProps<typeof Ionicons>['name']

const categories: { key: string; icon: IconName }[] = [
  { key: 'All', icon: 'grid-outline' },
  { key: 'My', icon: 'heart-outline' },
  { key: 'Anxious', icon: 'sad-outline' },
  { key: 'Sleep', icon: 'moon-outline' },
  { key: 'Kids', icon: 'happy-outline' },
]

const sessions = [
  { id: '1', title: '7 Days of Calm', bgColor: '#90AFFE' },
  { id: '2', title: 'Anxiety Release', bgColor: '#FFB26B' },
  { id: '3', title: '3-Minute Breathing', bgColor: '#6AF8E4' },
  { id: '4', title: 'Mindful Walk', bgColor: '#CACB68' },
]

export default function MeditateScreen() {
  const [fontsLoaded] = useFonts(fontMap)
  if (!fontsLoaded) return null

  const [activeCategory, setActiveCategory] = useState<string>('All')

  const renderCategory = ({ key, icon }: { key: string; icon: IconName }) => {
    const isActive = activeCategory === key
    return (
      <TouchableOpacity
        key={key}
        onPress={() => setActiveCategory(key)}
        style={styles.categoryContainer}
      >
        <View
          style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}
        >
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <Text
          style={[
            styles.categoryText,
            isActive && styles.categoryTextActive,
            { fontFamily: 'HelveticaNeueMedium' },
          ]}
        >
          {key}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderSession = ({ item }: { item: typeof sessions[0] }) => (
    <View style={[styles.sessionCard, { backgroundColor: item.bgColor }]}>
      <Text style={[styles.sessionTitle, { fontFamily: 'HelveticaNeueMedium' }]}>
        {item.title}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.title, { fontFamily: 'HelveticaNeueMedium' }]}>Meditate</Text>
        <Text style={[styles.subtitle, { fontFamily: 'HelveticaNeueMedium' }]}>
          we can learn how to recognize when our minds{"\n"}are doing their
          normal everyday acrobatics.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(renderCategory)}
        </ScrollView>

        <TouchableOpacity style={styles.dailyCard}>
          <View>
            <Text style={[styles.dailyTitle, { fontFamily: 'HelveticaNeueMedium' }]}>Daily Calm</Text>
            <Text style={[styles.dailySubtitle, { fontFamily: 'HelveticaNeueMedium' }]}>APR 30 · PAUSE PRACTICE</Text>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.sessionRow}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get('window')
const cardWidth = (width - 60) / 2

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#3F414E',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A0A3B1',
    marginVertical: 12,
  },
  categoriesContainer: {
    paddingVertical: 15,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  iconWrapper: {
    padding: 18,
    height: 60,
    width: 60,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#A0A3B1',
  },
  iconWrapperActive: {
    backgroundColor: '#8E97FD',
  },
  categoryText: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
  },
  categoryTextActive: {
    color: '#8E97FD',
  },
  dailyCard: {
    marginTop: 20,
    backgroundColor: '#ECD3C2',
    borderRadius: 20,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  dailySubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3F414E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionRow: { justifyContent: 'space-between', marginTop: 20 },
  sessionCard: {
    width: cardWidth,
    height: 120,
    borderRadius: 20,
    justifyContent: 'flex-end',
    padding: 16,
  },
  sessionTitle: { fontSize: 18, fontWeight: '600', color: '#fff' },
})