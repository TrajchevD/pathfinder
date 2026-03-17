import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../constants/colors';

export function PermissionDenied() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>📍</Text>
      <Text style={{
        color: Colors.text,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
      }}>
        Location Access Needed
      </Text>
      <Text style={{
        color: Colors.textMuted,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
      }}>
        PathFinder needs location permission to track your routes.
        Please enable it in your device settings.
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openSettings()}
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>
          Open Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}