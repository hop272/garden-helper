import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

export default function PlantMarker({item}) {
  return (
    <Marker coordinate={item.coords} identifier={item.id} pinColor={item.type === 'grass' ? 'green' : 'purple'}>
      <Callout>
        <View style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.type}</Text>
          {item.weather ? (
            <Text>Temp: {item.weather.temperature}°C, Wind: {item.weather.windspeed}m/s</Text>
          ) : (
            <Text>No recent weather</Text>
          )}
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: { width: 180 },
  title: { fontWeight: '600', marginBottom: 4 }
});
