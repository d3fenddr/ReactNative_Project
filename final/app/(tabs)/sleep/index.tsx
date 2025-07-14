import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-url-polyfill/auto';

export default function SleepScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24 }}>Sleep</Text>
    </View>
  );
}