//Code for MapTiler
// import React from 'react';
// import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
// import MapView, { Polyline, Marker, UrlTile } from 'react-native-maps';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { getActivityById } from '../database/db';
// import { formatDistance, formatDuration } from '../utils/distance';
// import { Colors } from '../constants/colors';

// const MAPTILER_KEY = process.env.EXPO_PUBLIC_MAPTILER_KEY;

// export function DetailScreen() {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { activityId } = route.params;

//   const activity = getActivityById(activityId);
//   const coordinates: { latitude: number; longitude: number }[] =
//     JSON.parse(activity.coordinates);

//   const date = new Date(activity.date);
//   const formattedDate = date.toLocaleDateString('en-US', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   });
//   const formattedTime = date.toLocaleTimeString('en-US', {
//     hour: '2-digit', minute: '2-digit',
//   });

//   const midpoint = coordinates[Math.floor(coordinates.length / 2)];

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.background }}>
//       <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

//       <View style={{
//         paddingTop: 52,
//         paddingBottom: 16,
//         paddingHorizontal: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: Colors.background,
//       }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{
//             marginRight: 14,
//             backgroundColor: Colors.card,
//             padding: 8,
//             borderRadius: 10,
//           }}
//         >
//           <Text style={{ color: Colors.text, fontSize: 18 }}>←</Text>
//         </TouchableOpacity>
//         <View>
//           <Text style={{ color: Colors.text, fontSize: 22, fontWeight: 'bold' }}>
//             Activity Detail
//           </Text>
//           <Text style={{ color: Colors.textMuted, fontSize: 13 }}>
//             {formattedDate}
//           </Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
//         <View style={{
//           height: 300,
//           marginHorizontal: 16,
//           borderRadius: 20,
//           overflow: 'hidden',
//           marginBottom: 16,
//         }}>
//           <MapView
//             style={{ flex: 1 }}
//             initialRegion={{
//               latitude: midpoint.latitude,
//               longitude: midpoint.longitude,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             }}
//             scrollEnabled={false}
//             zoomEnabled={false}
//             mapType="none"
//           >
//             <UrlTile
//               urlTemplate={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
//               maximumZ={19}
//               flipY={false}
//               zIndex={1}
//               tileSize={256}
//             />
//             <Polyline
//               coordinates={coordinates}
//               strokeColor={Colors.primary}
//               strokeWidth={4}
//             />
//             <Marker coordinate={coordinates[0]} pinColor="green" title="Start" />
//             <Marker coordinate={coordinates[coordinates.length - 1]} pinColor="red" title="End" />
//           </MapView>
//         </View>

//         <View style={{
//           marginHorizontal: 16,
//           backgroundColor: Colors.card,
//           borderRadius: 16,
//           padding: 20,
//           borderWidth: 1,
//           borderColor: Colors.border,
//         }}>
//           <Text style={{ color: Colors.textMuted, fontSize: 13, marginBottom: 16 }}>
//             {formattedTime}
//           </Text>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ color: Colors.textMuted, fontSize: 12 }}>DISTANCE</Text>
//               <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
//                 {formatDistance(activity.distance)}
//               </Text>
//             </View>
//             <View style={{ width: 1, backgroundColor: Colors.border }} />
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ color: Colors.textMuted, fontSize: 12 }}>DURATION</Text>
//               <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
//                 {formatDuration(activity.duration)}
//               </Text>
//             </View>
//             <View style={{ width: 1, backgroundColor: Colors.border }} />
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ color: Colors.textMuted, fontSize: 12 }}>POINTS</Text>
//               <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
//                 {coordinates.length}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

//Code with Google
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getActivityById } from '../database/db';
import { formatDistance, formatDuration } from '../utils/distance';
import { Colors } from '../constants/colors';

export function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { activityId } = route.params;

  const activity = getActivityById(activityId);
  const coordinates: { latitude: number; longitude: number }[] =
    JSON.parse(activity.coordinates);

  const date = new Date(activity.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });

  const midpoint = coordinates[Math.floor(coordinates.length / 2)];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={{
        paddingTop: 52,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginRight: 14,
            backgroundColor: Colors.card,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: Colors.text, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ color: Colors.text, fontSize: 22, fontWeight: 'bold' }}>
            Activity Detail
          </Text>
          <Text style={{ color: Colors.textMuted, fontSize: 13 }}>
            {formattedDate}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{
          height: 300,
          marginHorizontal: 16,
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: midpoint.latitude,
              longitude: midpoint.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            mapType="standard"
          >
            <Polyline
              coordinates={coordinates}
              strokeColor={Colors.primary}
              strokeWidth={4}
            />
            <Marker coordinate={coordinates[0]} pinColor="green" title="Start" />
            <Marker coordinate={coordinates[coordinates.length - 1]} pinColor="red" title="End" />
          </MapView>
        </View>

        <View style={{
          marginHorizontal: 16,
          backgroundColor: Colors.card,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: Colors.border,
        }}>
          <Text style={{ color: Colors.textMuted, fontSize: 13, marginBottom: 16 }}>
            {formattedTime}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.textMuted, fontSize: 12 }}>DISTANCE</Text>
              <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
                {formatDistance(activity.distance)}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: Colors.border }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.textMuted, fontSize: 12 }}>DURATION</Text>
              <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
                {formatDuration(activity.duration)}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: Colors.border }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.textMuted, fontSize: 12 }}>POINTS</Text>
              <Text style={{ color: Colors.text, fontSize: 26, fontWeight: 'bold', marginTop: 4 }}>
                {coordinates.length}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}