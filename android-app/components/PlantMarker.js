import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

export default function PlantMarker({ item }) {
  const pinColor = item.type === 'grass' ? '#4CAF50' : item.type === 'water' ? '#2196F3' : item.type === 'furniture' ? '#795548' : '#8E44AD';

  return (
    <Marker coordinate={item.coords} identifier={item.id} pinColor={pinColor}>
      <Callout>
        <View style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.type}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
          {item.weather ? (
            <Text style={styles.weather}>Temp: {item.weather.temperature}°C · Wind: {item.weather.windspeed} m/s</Text>
          ) : (
            <Text style={styles.weather}>Weather not available</Text>
          )}
          {item.advice ? <Text style={styles.advice}>{item.advice}</Text> : null}
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: { width: 200 },
  title: { fontWeight: '700', marginBottom: 4 },
  type: { marginBottom: 4, color: '#555' },
  weather: { marginBottom: 6, color: '#444' },
  advice: { color: '#2C3E50' },
});
