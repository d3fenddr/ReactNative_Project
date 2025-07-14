import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tojblwkttrinxhidoudf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvamJsd2t0dHJpbnhoaWRvdWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDIwODAsImV4cCI6MjA2NzgxODA4MH0.RuMCss9F39anekUk5YHQR2D-G1XVvnja6G5V_eI0DUo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)