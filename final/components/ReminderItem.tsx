import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ReminderItemProps {
  time: string
  days: string[]
  onEdit?: () => void
}

const ReminderItem: React.FC<ReminderItemProps> = ({ time, days, onEdit }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.days}>{days.join(', ')}</Text>
    </View>
    {onEdit && (
      <Pressable onPress={onEdit} style={styles.editButton}>
        <Ionicons name="pencil" size={20} color="#8E97FD" />
      </Pressable>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
  days: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  }
})

export default ReminderItem