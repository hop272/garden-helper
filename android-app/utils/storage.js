import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'GH_MARKERS_V1';

export async function loadMarkers() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('loadMarkers error', e);
    return [];
  }
}

export async function saveMarkers(markers) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(markers));
  } catch (e) {
    console.warn('saveMarkers error', e);
  }
}
