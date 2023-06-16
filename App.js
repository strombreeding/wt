// import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, Platform, StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

//config
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
console.log(SCREEN_WIDTH, SCREEN_HEIGHT * 0.1);

const StatusBarHeight = Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;
const getDay = (day) => {
  console.log("ㅎㅇㅎㅇ");
  switch (day) {
    case 0:
      day = "일";
      break;
    case 1:
      day = "월";
      break;
    case 2:
      day = "화";
      break;
    case 3:
      day = "수";
      break;
    case 4:
      day = "목";
      break;
    case 5:
      day = "금";
      break;
    case 6:
      day = "토";
      break;
  }
  return day;
};
const date = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  day: getDay(new Date().getDay()),
};
console.log(date);
export default function App() {
  const [x, setX] = useState(0);
  useEffect(() => {
    // this.scrollView.scrollTo({ y: 812 * 2 });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // paddingTop: StatusBarHeight,
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
        <View id="1" style={styles.nowWeater}>
          <View style={{ backgroundColor: "grey", marginTop: 40 }}>
            <Text style={styles.titleText}>{[date.year + ".", date.month + ".", date.date + ".", date.day]}</Text>
          </View>
          <Text style={styles.titleText}>27°C</Text>
          <View style={{ backgroundColor: "grey", width: SCREEN_WIDTH * 0.7, height: 250, marginTop: 30 }}>
            <Text>이미지가 들어갈 공간</Text>
          </View>
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
        {/* 요일별 */}
        <View id="2" style={styles.daysWeater}>
          <Text>요일별 날씨</Text>
          <View>
            <Text>Hi 1</Text>
          </View>
          <View>
            <Text>Hi 2</Text>
          </View>
        </View>
        {/* 시간별 */}
        <View id="3" style={styles.hoursWeater}>
          <Text>시간별 날씨</Text>
          <View>
            <Text>Hi 1</Text>
          </View>
          <View>
            <Text>Hi 2</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
  },
  nowWeater: {
    backgroundColor: "tomato",
    width: SCREEN_WIDTH,
    alignItems: "center",
    flex: 1,
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
});
