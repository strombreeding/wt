import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getLocation, getNowWeather, getWeater, getXY } from "./require_functions/App.util";
import * as Location from "expo-location";
import { dateData } from "./jsjs";
import NowWeather from "./components/Weather/NowWeather";

//config
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
console.log(SCREEN_WIDTH, SCREEN_HEIGHT * 0.1);
const StatusBarHeight = Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weathers, setWeathers] = useState([{}]);
  /** 위치관련 권한 허용 묻기 */
  const ask = async () => {
    const { granted, status } = await Location.requestForegroundPermissionsAsync();
    console.log(granted, status);
    if (!granted || !status) {
      console.log("비동의");
      alert("동의하지 않음- 설정에서 위치동의해주세요");
    } else {
      const { latitude, longitude } = await getXY();
      setLatitude(latitude);
      setLongitude(longitude);
      const [weatherData] = await Promise.all([getWeater(latitude, longitude)]);
      setWeathers(weatherData);
    }
  };
  useEffect(() => {
    ask();
  }, []);

  return latitude === null || longitude === null ? (
    <View
      style={{
        backgroundColor: "gold",
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="defalut" />
      <View
        style={{
          backgroundColor: "black",
          height: StatusBarHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <ScrollView
        ref={(ref) => (this.scrollView = ref)}
        style={styles.mainContainer}
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollEnd={() => console.log("end", this.scrollView.width)}
      >
        {/* 현재 */}
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View id="1" style={styles.nowWeater}>
            <NowWeather latitude={latitude} longitude={longitude}></NowWeather>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "orange",
                  marginTop: 25,
                  padding: 15,
                }}
              >
                <Text>미세먼지</Text>
                <Text>좋음</Text>
                <Text>20 yg/m</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "green",
                  marginTop: 25,
                  padding: 15,
                }}
              >
                <Text>초미세먼지</Text>
                <Text>좋음</Text>
                <Text>20 yg/m</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "red",
                  marginTop: 25,
                  padding: 15,
                }}
              >
                <Text>오존</Text>
                <Text>좋음</Text>
                <Text>20 yg/m</Text>
              </View>
            </View>
            <Button
              onPress={(index) => {
                this.scrollView.scrollTo({ x: 375 });
              }}
              title="gdgd"
            ></Button>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
  },
  nowWeater: {
    backgroundColor: "gold",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  daysWeater: {
    backgroundColor: "blue",
    width: SCREEN_WIDTH,
  },
  hoursWeater: {
    backgroundColor: "grey",
    width: SCREEN_WIDTH,
  },
  titleText: {
    // marginTop: 50 + StatusBarHeight,
    fontSize: 50,
    backgroundColor: "blue",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "600",
  },

  anotherInfo: {
    backgroundColor: "grey",
    width: SCREEN_WIDTH * 0.7,
    height: 250,
    marginTop: 30,
    alignItems: "center",
  },
});

{
  /* 요일별 */
}
{
  /* <View id="2" style={styles.daysWeater}>
            <Text>요일별 날씨</Text>
            <View>
              <Text>Hi 1</Text>
            </View>
            <View>
              <Text>Hi 2</Text>
            </View>
          </View> */
}
{
  /* 시간별 */
}
{
  /* <View id="3" style={styles.hoursWeater}>
            <Text>시간별 날씨</Text>
            <View>
              <Text>Hi 1</Text>
            </View>
            <View>
              <Text>Hi 2</Text>
            </View>
          </View> */
}

{
  /* <View
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
            </View> */
}
