import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WeatherScreen from "./screens/WeatherScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
  // Asks for location permission.
  const requestCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(
      Location.Accuracy.Balanced,
      10000
    );
    if (status !== "granted") {
      Alert.alert("Warning", "Permission denied.");
    } else {
      navigation.navigate("WeatherScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greet}>Welcome to SimpleWeatherApp</Text>
      <Text style={styles.permissionInfo}>
        Please give permission to access your location
      </Text>
      <TouchableOpacity
        style={styles.givePermission}
        onPress={requestCurrentLocation}
      >
        <Text style={{ color: "#003566", fontSize: 16, fontWeight: "700" }}>
          Share Location
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="WeatherScreen"
          options={{ headerShown: false }}
          component={WeatherScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003566",
    alignItems: "center",
    justifyContent: "center",
  },
  greet: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 15,
  },
  permissionInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    width: (Dimensions.get("screen").width * 75) / 100,
    textAlign: "center",
  },
  givePermission: {
    width: 170,
    height: 40,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
