import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { loadMarkers, saveMarkers } from './utils/storage';
import { fetchWeatherForCoords } from './utils/weatherApi';
import PlantMarker from './components/PlantMarker';

export default function App() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      const m = await loadMarkers();
      setMarkers(m);
      // fetch weather for markers
      const updated = await Promise.all(m.map(async item => {
        const w = await fetchWeatherForCoords(item.coords.latitude, item.coords.longitude);
        return { ...item, weather: w };
      }));
      setMarkers(updated);
    })();
  }, []);

  useEffect(() => {
    saveMarkers(markers);
  }, [markers]);

  const onLongPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    Alert.alert('Add item', 'Choose type to add', [
      { text: 'Grass', onPress: () => addMarker(coords, 'grass') },
      { text: 'Plant', onPress: () => addMarker(coords, 'plant') },
      { text: 'Water feature', onPress: () => addMarker(coords, 'water') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const addMarker = async (coords, type) => {
    const id = `${Date.now()}`;
    const item = { id, name: `${type} ${new Date().toLocaleDateString()}`, type, coords };
    const weather = await fetchWeatherForCoords(coords.latitude, coords.longitude);
    item.weather = weather;
    const next = [...markers, item];
    setMarkers(next);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
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
      <View style={styles.footer}>
        <Text style={{color:'#fff'}}>Long-press map to add garden items.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: '#333', padding: 8, borderRadius: 6, alignItems: 'center' }
});
