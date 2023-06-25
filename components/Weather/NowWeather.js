import { View, Text, Image } from "react-native";
import { styles } from "../../App";
import { dateData } from "../../jsjs";
import { useEffect, useState } from "react";
import { getLocation, getNowWeather } from "../../require_functions/App.util";
const NowWeather = ({ latitude, longitude }) => {
  const [location, setLocation] = useState({ city: null, district: null });
  const [nowWeater, setNowWeather] = useState({ temp: null });
  const zz = async () => {
    const [location, nowWeaterData] = await Promise.all([
      getLocation(latitude, longitude),
      getNowWeather(latitude, longitude),
    ]);
    setLocation({
      city: location.city,
      district: location.district,
    });
    setNowWeather(nowWeaterData);
  };
  useEffect(() => {
    zz();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "blue",
      }}
    >
      <View style={{ backgroundColor: "grey", marginTop: 40 }}>
        <Text style={styles.locationText}>{[location.city + " ", location.district]}</Text>
        <Text style={styles.dateText}>
          {[dateData.year + "-", dateData.month + "-", dateData.date + "-", dateData.day + "요일"]}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: -20,
          }}
          source={{
            url: nowWeater.iconCode,
          }}
        ></Image>
        <Text>{nowWeater.weather}</Text>
        <Text style={styles.titleText}>{nowWeater.temp}</Text>
      </View>
    </View>
  );
};

export default NowWeather;
