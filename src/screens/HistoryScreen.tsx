import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList,
  TouchableOpacity, StatusBar
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getActivities, Activity } from '../database/db';
import { formatDistance, formatDuration } from '../utils/distance';
import { Colors } from '../constants/colors';

export function HistoryScreen() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      setActivities(getActivities());
    }, [])
  );

  function renderItem({ item }: { item: Activity }) {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { activityId: item.id })}
        style={{
          backgroundColor: Colors.card,
          borderRadius: 16,
          padding: 16,
          marginHorizontal: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors.border,
        }}
      >
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: Colors.primary + '33',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 14,
        }}>
          <Text style={{ fontSize: 22 }}>🏃</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 16 }}>
            {formattedDate}
          </Text>
          <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>
            {formattedTime}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 15 }}>
            {formatDistance(item.distance)}
          </Text>
          <Text style={{ color: Colors.textMuted, fontSize: 13, marginTop: 2 }}>
            {formatDuration(item.duration)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={{
        paddingTop: 52,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
      }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: 'bold' }}>
          History
        </Text>
        <Text style={{ color: Colors.textMuted, fontSize: 14 }}>
          {activities.length} activities recorded
        </Text>
      </View>

      {activities.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>🗺️</Text>
          <Text style={{ color: Colors.text, fontSize: 18, fontWeight: 'bold' }}>
            No activities yet
          </Text>
          <Text style={{ color: Colors.textMuted, fontSize: 14, marginTop: 8 }}>
            Start tracking to record your first route!
          </Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        />
      )}
    </View>
  );
}