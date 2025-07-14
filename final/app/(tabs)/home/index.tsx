import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import dayjs from 'dayjs'

import Logo from '../../../assets/images/logo-black.svg'
import { useAuth } from '../../../contexts/AuthContext'

import ScreenWrapper from '../../../components/ScreenWrapper'
import Text from '../../../components/Text'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import IconButton from '../../../components/IconButton'

import {
  PURPLE,
  CARD_BG_SECONDARY,
  DARK_CARD,
  BUTTON_TXT,
  REC_FOCUS,
  REC_HAPPINESS,
  REC_MINDFULNESS,
  REC_GROWTH,
  BUTTON_BG,
} from '../../../constants/colors'

export default function HomeScreen() {
  const { user } = useAuth()
  const name = user?.user_metadata?.username || user?.email || 'Guest'

  const hour = dayjs().hour()
  let greeting = 'Good Morning'
  if (hour >= 18 || hour < 6) greeting = 'Good Evening'
  else if (hour >= 12) greeting = 'Good Afternoon'

  const recItems = [
    { id: 'focus',      label: 'Focus',      bgColor: REC_FOCUS },
    { id: 'happiness',  label: 'Happiness',  bgColor: REC_HAPPINESS },
    { id: 'mindfulness',label: 'Mindfulness',bgColor: REC_MINDFULNESS },
    { id: 'growth',     label: 'Growth',     bgColor: REC_GROWTH },
  ]

  return (
    <ScreenWrapper>
      <View style={styles.logoContainer}>
        <Logo width={210} height={120} />
      </View>

      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>
          {greeting}, {name}
        </Text>
        <Text style={styles.greetingSubtitle}>
          We wish you have a good day
        </Text>
      </View>

      <View style={styles.cardsRow}>
        <Card style={[styles.card, { backgroundColor: PURPLE }]}>
          <Text style={styles.cardLabel}>Basics</Text>
          <Text style={styles.cardType}>COURSE</Text>
          <Text style={styles.cardDuration}>3-10 MIN</Text>
          <Button
            title="START"
            variant="secondary"
            onPress={() => {}}
            textStyle={styles.cardButtonText}
          />
        </Card>
        <Card style={[styles.card, { backgroundColor: CARD_BG_SECONDARY }]}>
          <Text style={styles.cardLabel}>Relaxation</Text>
          <Text style={styles.cardType}>MUSIC</Text>
          <Text style={styles.cardDuration}>3-10 MIN</Text>
          <Button
            title="START"
            variant="secondary"
            onPress={() => {}}
            textStyle={styles.cardButtonText}
          />
        </Card>
      </View>

      <Card style={[styles.dailyThought, { backgroundColor: DARK_CARD }]}>
        <View>
          <Text style={styles.dailyTitle}>Daily Thought</Text>
          <Text style={styles.dailySubtitle}>Meditation • 3-10 MIN</Text>
        </View>
        <IconButton
          name="play"
          size={24}
          color={BUTTON_BG}
          onPress={() => console.log('Play Daily Thought')}
        />
      </Card>

      <Text style={styles.sectionTitle}>Recommended for you</Text>
      <FlatList
        data={recItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recList}
        renderItem={({ item }) => (
          <Card style={styles.recCard}>
            <View style={[styles.recImage, { backgroundColor: item.bgColor }]} />
            <Text style={styles.recLabel}>{item.label}</Text>
            <Text style={styles.recMeta}>MEDITATION • 3-10 MIN</Text>
          </Card>
        )}
      />
    </ScreenWrapper>
  )
}

const CARD_WIDTH = 160
const IMAGE_HEIGHT = 100

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 2,
  },
  greeting: {
    marginBottom: 24,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  greetingSubtitle: {
    fontSize: 20,
    color: '#666',
    marginTop: 4,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
    marginBottom: 8,
  },
  cardDuration: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 12,
  },
  cardButtonText: {
    fontSize: 14,
  },
  dailyThought: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  dailySubtitle: {
    fontSize: 12,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  recList: {
    paddingLeft: 4,
  },
  recCard: {
    width: CARD_WIDTH,
    marginRight: 12,
    padding: 0,
  },
  recImage: {
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    margin: 9,
  },
  recMeta: {
    fontSize: 12,
    color: '#666',
    marginLeft: 9,
  },
})