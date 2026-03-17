import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { MapScreen } from './src/screens/MapScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { initDB } from './src/database/db';
import { Colors } from './src/constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryList" component={HistoryScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.card,
            borderTopColor: Colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
        }}
      >
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: 'Track',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>🗺️</Text>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryStack}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>📋</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}