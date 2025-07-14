import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const rawUser = await AsyncStorage.getItem('user');
      const rawToken = await AsyncStorage.getItem('token');
      if (rawUser && rawToken) {
        setUser(JSON.parse(rawUser));
        setToken(rawToken);
      }
      setLoading(false);
    })();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ needsConfirmation: boolean }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) {
      console.error('Supabase signUp error:', error);
      throw new Error(error.message);
    }

    if (data.session && data.user) {
      const session: Session = data.session;
      const newUser: User = data.user;
      setUser(newUser);
      setToken(session.access_token);
      await AsyncStorage.multiSet([
        ['user', JSON.stringify(newUser)],
        ['token', session.access_token]
      ]);
      return { needsConfirmation: false };
    }

    return { needsConfirmation: true };
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error('Supabase login error:', error);
      throw new Error(error.message);
    }
    const session: Session = data.session!;
    const loggedUser: User = data.user!;
    setUser(loggedUser);
    setToken(session.access_token);
    await AsyncStorage.multiSet([
      ['user', JSON.stringify(loggedUser)],
      ['token', session.access_token]
    ]);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(['user', 'token']);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);