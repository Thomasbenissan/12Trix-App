import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";
import PinkPlateMenu from "./PinkPlateMenu";

const FriendListScreen = ({ navigation }) => {
  const [isConstruct, setIsConstruct] = useState(false);
  const [operation, setOperation] = useState("");
  const translation = useRef(new Animated.Value(0)).current;
  const nextTranslation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [selectedFriend, setSelectedFriend] = useState([]);

  const operationRef = useRef(operation);

  const toggleSelectUser = (id) => {
    if (selectedFriend.includes(id)) {
      setSelectedFriend(selectedFriend.filter((userId) => userId !== id));
    } else {
      setSelectedFriend([...selectedFriend, id]);
    }
  };

  const friendList = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
    { id: "3", name: "Michael" },
    { id: "4", name: "Maya" },
    { id: "5", name: "Albert" },
    { id: "6", name: "Hana" },
    { id: "7", name: "William" },
    { id: "8", name: "Yana" },
    { id: "9", name: "Joseph" },
    { id: "10", name: " Johnson" },
  ];

  useEffect(() => {
    operationRef.current = operation;
    console.log(operation);
  }, [operation]);

  const onTranslate = () => {
    Animated.timing(translation, {
      toValue: 100,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const onNextTranslate = () => {
    setIsConstruct(true);
    Animated.timing(translation, {
      toValue: 100,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      console.log("Operation before navigation:", operationRef.current);
      navigation.push("Problem", { operation: operationRef.current });
    });
  };

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <View style={styles.bgRobot}>
        <Image
          style={{ width: 529, height: 1321, objectFit: "contain" }}
          source={require("../../assets/robot-3.png")}
        />
      </View>

      <View style={styles.plate}>
        <ImageBackground
          source={require("../../assets/platefriend.png")}
          resizeMode="stretch"
          style={{
            flex: 1,

            // width: "100%",
            // alignItems: "center",
            // justifyContent: "center",
            // width: 380,
            // height: "100%",
            // width: "100%",
          }}
        >
          <Text style={styles.plateTitle}>Share with a friend</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SendRequest")}>
            <LinearGradient
              colors={["#92d3ef", "#3ca5d6", "#40a9db", "#40a9db"]}
              locations={[0, 0.297, 0.523, 1]}
              style={{ ...styles.startBtn, marginBottom: 10 }}
            >
              <Text style={styles.newFriendText}>+ Add a new friend</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <FlatList
              data={friendList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = selectedFriend.includes(item.id);
                return (
                  <TouchableOpacity onPress={() => toggleSelectUser(item.id)}>
                    <LinearGradient
                      colors={
                        isSelected
                          ? ["#88c078", "#4c9638", "#5faf48", "#88c078"]
                          : ["#F0A277", "#E68958", "#E15E19", "#E15E19"]
                      }
                      locations={[0, 0.297, 0.523, 1]}
                      style={styles.listUserBtn}
                    >
                      <Image
                        source={
                          isSelected
                            ? require("../../assets/greenSquare.png")
                            : require("../../assets/square.png")
                        }
                        style={styles.innerIcon}
                      />
                      {/* <View style={styles.boxBtn} /> */}
                      <Text style={styles.friendListText}>{item?.name}</Text>
                      <Image
                        source={require("../../assets/banana.png")}
                        style={styles.innerIcon}
                      />
                      <Image
                        source={require("../../assets/strawberry.png")}
                        style={styles.innerIcon}
                      />
                      <Image
                        source={require("../../assets/duck.png")}
                        style={styles.innerIcon}
                      />
                      <Image
                        source={require("../../assets/fish.png")}
                        style={styles.innerIcon}
                      />
                      <Image
                        source={require("../../assets/ananas.png")}
                        style={styles.innerIcon}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
          <TouchableOpacity style={styles.shareBtnWrap}>
            <LinearGradient
              //   colors={["#cecdcd", "#a7a6a6", "#a5a4a4", "#a8a6a6"]}
              colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
              locations={[0, 0.297, 0.523, 1]}
              style={styles.shareBtn}
            >
              <Text style={styles.startBtnText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View
        style={{
          position: "absolute",
          zInex: 250,
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <HomeHeader />
      </View>

      <View
        style={{
          position: "absolute",
          zInex: 250,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <BottomTabs navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

export default FriendListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bgRobot: {
    position: "absolute",
    top: -62,
    left: "50%",
    zIndex: 0,
    transform: [{ translateX: -264.5 }],
    width: 529,
    height: 1321,
    objectFit: "contain",
  },
  plate: {
    width: 370,
    height: 400,
    position: "absolute",
    top: 380,
    // alignItems: "center",
    alignSelf: "center",
    left: "42%",
    zIndex: 1,
    transform: [{ translateX: -161 }],
  },
  thermostat: {
    width: 163,
    height: 112,
    position: "absolute",
    top: 463,
    left: 120,
    zIndex: 150,
  },
  ekg: {
    width: 114,
    height: 112,
    position: "absolute",
    top: 463,
    right: 120,
    zIndex: 150,
  },
  startBtnCont: {
    width: 215,
    height: 57,
    position: "absolute",
    top: 785,
    left: "50%",
    zIndex: 155,
  },
  startBtn: {
    width: 200,
    height: 45,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 17,
  },

  listUserBtn: {
    width: "80%",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },

  shareBtn: {
    width: 200,
    height: 45,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
  },

  shareBtnWrap: {
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 17,
    marginBottom: 30,
    marginTop: 10,
  },

  newFriendText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 18,
  },

  friendListText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 18,
    flex: 1,
    flex: 1,
    marginLeft: 7,
  },

  startBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 26,
  },
  panel: {
    width: 165,
    height: 81,
    position: "absolute",
    top: 673,
    left: "50%",
    zIndex: 160,
  },
  coloredBtnCont: {
    width: 48,
    height: 48,
    position: "absolute",
    top: 612,
    left: "50%",
    zIndex: 160,
  },
  coloredBtn: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  coloredBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 26,
  },
  circleBtnCont: {
    width: 48,
    height: 48,
    position: "absolute",
    top: 705,
    left: "50%",
    zIndex: 160,
  },
  circleBtn: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  plateTitle: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 20,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 6,
    marginTop: 30,
    marginLeft: 15,
  },
  plateText: {
    fontFamily: "Rubik-Regular",
    color: "#001744",
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
  },
  pinkPlateMenu: {
    width: 391,
    height: 755,
    position: "absolute",
    top: 90,
    left: "50%",
    zIndex: 170,
    transform: [{ translateX: -195.5 }],
  },

  boxBtn: {
    backgroundColor: "red",
    height: 18,
    width: 18,
    borderRadius: 4,
  },

  innerIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 3,
  },
});
