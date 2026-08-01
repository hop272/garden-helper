import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace these values with your Supabase project values.
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function signUp(email, password) {
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function saveGardenForUser(userId, markers) {
  try {
    const payload = { user_id: userId, markers };
    await supabase.from('gardens').upsert(payload, { onConflict: 'user_id' });
  } catch (error) {
    console.warn('Supabase saveGardenForUser failed', error.message);
  }
}

export async function loadGardenForUser(userId) {
  try {
    const { data, error } = await supabase
      .from('gardens')
      .select('markers')
      .eq('user_id', userId)
      .single();
    if (error) {
      console.warn('Supabase loadGardenForUser failed', error.message);
      return null;
    }
    return data?.markers || null;
  } catch (error) {
    console.warn('Supabase loadGardenForUser error', error.message);
    return null;
  }
}
