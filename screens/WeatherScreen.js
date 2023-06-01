import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import DateTime from "../components/DateTime";
import { API_KEY } from "../components/API_KEY";

export default function WeatherScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        await fetch(weatherURL)
          .then((response) => response.json())
          .then((responseJson) => {
            setData(responseJson);
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#003566",
        }}
      >
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  } else {
    const weatherList = data.list;
    return (
      <View style={styles.container}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationInfo}>{data.city.name}</Text>
          <DateTime />
        </View>
        <View style={styles.weatherNow}>
          <View style={styles.currentWeather}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
              }}
              style={styles.weatherImage}
            />
            <Text style={styles.weatherInfo}>
              {data.list[0].weather[0].main}
            </Text>
          </View>
          <Text style={styles.weatherDegree}>
            {data.list[0].main.temp.toFixed()}°
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#003566",
              position: "absolute",
              top: "7%",
              left: 30,
            }}
          >
            Weather Info
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.anotherInfoSection}>
              <Image
                source={require("../assets/temperature.png")}
                style={{ width: 40, height: 40 }}
              />
              <View style={styles.bottomRow}>
                <Text style={styles.bottomRowTitle}>Min. Temp</Text>
                <Text style={styles.bottomRowText}>
                  {data.list[0].main.temp_min.toFixed()}°
                </Text>
              </View>
            </View>
            <View style={styles.anotherInfoSection}>
              <Image
                source={require("../assets/temperature.png")}
                style={{ width: 40, height: 40 }}
              />
              <View style={styles.bottomRow}>
                <Text style={styles.bottomRowTitle}>Max. Temp</Text>
                <Text style={styles.bottomRowText}>
                  {data.list[0].main.temp_max.toFixed()}°
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}
          >
            <View style={styles.anotherInfoSection}>
              <Image
                source={require("../assets/wind.png")}
                style={{ width: 40, height: 40 }}
              />
              <View style={styles.bottomRow}>
                <Text style={styles.bottomRowTitle}>Wind Speed</Text>
                <Text style={styles.bottomRowText}>
                  {data.list[0].wind.speed} m/s
                </Text>
              </View>
            </View>
            <View style={styles.anotherInfoSection}>
              <Image
                source={require("../assets/humidity.png")}
                style={{ width: 40, height: 40 }}
              />
              <View style={styles.bottomRow}>
                <Text style={styles.bottomRowTitle}>Humidity</Text>
                <Text style={styles.bottomRowText}>
                  {data.list[0].main.humidity}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003566",
    alignItems: "center",
  },

  locationHeader: {
    width: Dimensions.get("screen").width,
    height: (Dimensions.get("screen").height * 18) / 100,
    backgroundColor: "#003566",
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingBottom: 10,
  },

  locationInfo: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    paddingBottom: 2,
  },

  weatherNow: {
    width: (Dimensions.get("screen").width * 80) / 100,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "15%",
  },

  currentWeather: {
    alignItems: "center",
    flexDirection: "column",
  },

  weatherInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 5,
  },

  weatherDegree: {
    color: "white",
    fontSize: 72,
    fontWeight: "700",
    textAlign: "center",
    paddingLeft: 30,
  },

  weatherImage: {
    width: 120,
    height: 120,
  },

  bottomSection: {
    width: Dimensions.get("screen").width,
    height: (Dimensions.get("screen").height * 28) / 100,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    justifyContent: "center",
    alignContent: "center",
  },

  anotherInfoSection: {
    width: (Dimensions.get("screen").width * 40) / 100,
    height: 45,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    bottom: -17,
  },

  bottomRow: {
    flexDirection: "column",
    marginHorizontal: 20,
  },

  bottomRowTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },

  bottomRowText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
