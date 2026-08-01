import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { loadMarkers, saveMarkers } from './utils/storage';
import { fetchWeatherForCoords } from './utils/weatherApi';
import { askGemma, getAdviceForType } from './utils/gemma';
import { getSession, signIn, signUp, signOut, saveGardenForUser, loadGardenForUser } from './utils/supabase';
import PlantMarker from './components/PlantMarker';

export default function App() {
  const [markers, setMarkers] = useState([]);
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Ask about plants, watering, or weather in the garden.');
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const stored = await loadMarkers();
      const { data } = await getSession();
      let loadedMarkers = stored;

      if (data?.session?.user) {
        setSession(data.session.user);
        const remoteMarkers = await loadGardenForUser(data.session.user.id);
        if (remoteMarkers) {
          loadedMarkers = remoteMarkers;
        }
      }

      const updated = await Promise.all(loadedMarkers.map(async item => {
        const weather = await fetchWeatherForCoords(item.coords.latitude, item.coords.longitude);
        return { ...item, weather };
      }));

      setMarkers(updated);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    saveMarkers(markers);
    if (session) {
      saveGardenForUser(session.id, markers);
    }
  }, [markers, session]);

  const onLongPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    Alert.alert('Add item', 'Choose type to add', [
      { text: 'Grass', onPress: () => addMarker(coords, 'grass') },
      { text: 'Plant', onPress: () => addMarker(coords, 'plant') },
      { text: 'Water feature', onPress: () => addMarker(coords, 'water') },
      { text: 'Furniture', onPress: () => addMarker(coords, 'furniture') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const addMarker = async (coords, type) => {
    const id = `${Date.now()}`;
    const item = {
      id,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${new Date().toLocaleDateString()}`,
      type,
      coords,
      advice: getAdviceForType(type),
    };
    const weather = await fetchWeatherForCoords(coords.latitude, coords.longitude);
    item.weather = weather;
    setMarkers(current => [...current, item]);
  };

  const ask = () => {
    setAnswer(askGemma(question, markers));
    setQuestion('');
  };

  const handleSignIn = async () => {
    setLoading(true);
    await signIn(email, password);
    const { data } = await getSession();
    if (data?.session?.user) {
      setSession(data.session.user);
      const remoteMarkers = await loadGardenForUser(data.session.user.id);
      if (remoteMarkers) {
        setMarkers(remoteMarkers);
      }
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    await signUp(email, password);
    await handleSignIn();
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
        onLongPress={onLongPress}
      >
        <UrlTile
          urlTemplate={'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          maximumZ={19}
          flipY={false}
        />
        {markers.map(m => (
          <PlantMarker key={m.id} item={m} />
        ))}
      </MapView>

      <View style={styles.panel}>
        {loading ? (
          <Text style={styles.panelText}>Loading garden data…</Text>
        ) : session ? (
          <View>
            <Text style={styles.panelTitle}>Welcome back</Text>
            <Text style={styles.panelText}>Signed in as {session.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.panelTitle}>{hasAccount ? 'Sign in' : 'Create account'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={hasAccount ? handleSignIn : handleSignUp}>
              <Text style={styles.buttonText}>{hasAccount ? 'Sign in' : 'Sign up'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => setHasAccount(!hasAccount)}>
              <Text style={styles.linkText}>{hasAccount ? 'Create a new account' : 'Already have an account?'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.panelTitle}>Garden helper</Text>
        <Text style={styles.panelText}>Ask about soil, water, weather, planting, or garden care.</Text>
        <TextInput
          style={styles.questionInput}
          placeholder="How should I water my plants?"
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.button} onPress={ask}>
          <Text style={styles.buttonText}>Ask</Text>
        </TouchableOpacity>
        <ScrollView style={styles.answerBox}>
          <Text style={styles.answer}>{answer}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  panel: { position: 'absolute', top: 12, left: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: 12, maxHeight: '45%' },
  panelTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  panelText: { fontSize: 13, color: '#333', marginBottom: 8 },
  button: { backgroundColor: '#3A8DFF', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8, backgroundColor: '#fff' },
  questionInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8, backgroundColor: '#fff' },
  answerBox: { backgroundColor: '#f4f7ff', borderRadius: 8, padding: 10, maxHeight: 120 },
  answer: { color: '#222' },
});
