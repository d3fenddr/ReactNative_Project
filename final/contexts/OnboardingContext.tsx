import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

interface Reminders { time: string; days: string[] }
interface OnboardingData {
  topic: string | null;
  reminders: Reminders | null;
  setTopic: (t: string) => Promise<void>;
  setReminders: (r: Reminders) => Promise<void>;
}

const OnboardingContext = createContext<OnboardingData>({} as OnboardingData);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [topic, setTopicState] = useState<string | null>(null);
  const [reminders, setRemindersState] = useState<Reminders | null>(null);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem('topic');
      const r = await AsyncStorage.getItem('reminders');
      if (t) setTopicState(t);
      if (r) setRemindersState(JSON.parse(r));
    })();
  }, []);

  const setTopic = async (t: string) => {
    setTopicState(t);
    await AsyncStorage.setItem('topic', t);
  };
  const setReminders = async (r: Reminders) => {
    setRemindersState(r);
    await AsyncStorage.setItem('reminders', JSON.stringify(r));
  };

  return (
    <OnboardingContext.Provider value={{ topic, reminders, setTopic, setReminders }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);