import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";

const SendProblem = ({ navigation, route }) => {
  const { plateOne, plateTwo, plateThree, plateFour, plateFive } = route.params;

  const plateTranslateY = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current; // Start with 0 opacity
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(plateTranslateY, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const imageMap = {
    Grandma: require("../../assets/grandma-icon.png"),
    Unicorn: require("../../assets/unicorn-icon.png"),
    Ephraim: require("../../assets/ephraim-icon.png"),
    Alien: require("../../assets/alien-icon.png"),
    Mouse: require("../../assets/mouse-icon.png"),
    Hippo: require("../../assets/hippo-icon.png"),
    Superman: require("../../assets/superman-icon.png"),
    Princess: require("../../assets/princess-icon.png"),
    Pinocchio: require("../../assets/pinocchio-icon.png"),
    Table: require("../../assets/table-icon.png"),
  };

  const numberImageMap = {
    1: require("../../assets/orange-1.png"),
    2: require("../../assets/orange-2.png"),
    3: require("../../assets/orange-3.png"),
    4: require("../../assets/orange-4.png"),
    5: require("../../assets/orange-5.png"),
    6: require("../../assets/orange-6.png"),
    7: require("../../assets/orange-7.png"),
    8: require("../../assets/orange-8.png"),
    9: require("../../assets/orange-9.png"),
    10: require("../../assets/orange-10.png"),
  };

  const yellowPlateImageMap = {
    Hands: require("../../assets/hands-icon.png"),
    Tails: require("../../assets/tails-icon.png"),
    Heads: require("../../assets/heads-icon.png"),
    Gnomes: require("../../assets/gnoms-icon.png"),
    "Green Giants": require("../../assets/green-giants-icon.png"),
    Baldness: require("../../assets/bald-heads-icon.png"),
    Camels: require("../../assets/camels-icon.png"),
    Peppers: require("../../assets/peppers-icon.png"),
    Flies: require("../../assets/flies-icon.png"),
    Names: require("../../assets/grid-icon.png"),
  };

  const bluePlateImageMap = {
    "Were Eaten": require("../../assets/eaten-icon.png"),
    Disappeared: require("../../assets/disappeared-icon.png"),
    "Ran Away": require("../../assets/ran-away-icon.png"),
    "Fly to Another Country": require("../../assets/fly-icon.png"),
    Hide: require("../../assets/hide-icon.png"),
    "Went On A Trip": require("../../assets/trip-icon.png"),
    "Will Be Lost": require("../../assets/got-lost-icon.png"),
    "Went To The Sea": require("../../assets/sea-icon.png"),
    "Were Broken": require("../../assets/broken-icon.png"),
    Melted: require("../../assets/melted-icon.png"),
    "Were Born": require("../../assets/born-icon.png"),
    "Received a Gift": require("../../assets/gift-icon.png"),
    Duplicate: require("../../assets/duplicated-icon.png"),
    Adopted: require("../../assets/adopted-icon.png"),
    "Fly to The Moon and Find": require("../../assets/fly-to-moon-icon.png"),
    "Bake Bread": require("../../assets/bake-icon.png"),
    "Fell on Him": require("../../assets/fell-on-him-icon.png"),
    "Rained on Him": require("../../assets/rainfall-icon.png"),
    "Picked from the Tree": require("../../assets/picking-icon.png"),
    "The Tooth Fairy Brought": require("../../assets/tooth-icon.png"),
  };

  const greenPlateImageMap = {
    1: require("../../assets/green-1.png"),
    2: require("../../assets/green-2.png"),
    3: require("../../assets/green-3.png"),
    4: require("../../assets/green-4.png"),
    5: require("../../assets/green-5.png"),
    6: require("../../assets/green-6.png"),
    7: require("../../assets/green-7.png"),
    8: require("../../assets/green-8.png"),
    9: require("../../assets/green-9.png"),
    10: require("../../assets/green-10.png"),
  };

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <View style={styles.bgRobot}>
        <Image
          style={{ width: 529, height: 1321, objectFit: "contain" }}
          source={require("../../assets/robot-3.png")}
        />
      </View>

      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Would you like to send this to a friend?
        </Animated.Text>
      </View>

      <Animated.View
        style={[
          styles.plate,
          { transform: [{ translateY: plateTranslateY }] },
        ]}
      >
        <ImageBackground
          source={require("../../assets/plate2.png")}
          resizeMode="contain"
          style={styles.plateBackground}
        >
          <View style={[styles.problem]}>
            <View style={[styles.plateRow]}>
              <Image source={imageMap[plateOne]} style={styles.icon} />
              <Text style={[styles.plateText, { marginLeft: 14 }]}>had</Text>
              <Image source={numberImageMap[plateTwo]} style={styles.icon} />
              <Image source={yellowPlateImageMap[plateThree]} style={styles.icon} />
            </View>

            <View
              style={[
                styles.plateRow,
                { justifyContent: "center", marginTop: 20 },
              ]}
            >
              <Image source={greenPlateImageMap[plateFive]} style={styles.icon} />
              <Image source={yellowPlateImageMap[plateThree]} style={styles.icon} />
              <Text
                style={[
                  styles.plateText,
                  { fontSize: 14, width: "35%", marginRight: 10 },
                ]}
              >
                {plateFour}
              </Text>
              <Image source={bluePlateImageMap[plateFour]} style={styles.icon} />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={[styles.plateText, { textAlign: "center" }]}>
                How many {plateThree} does {plateOne} have now?
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, { opacity: buttonsOpacity }]}>
        <TouchableOpacity
            onPress={() => {
            navigation.replace("FriendList", {
                plateOne,
                plateTwo,
                plateThree,
                plateFour,
                plateFive,
            });
            }}
        >
            <LinearGradient
            colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
            locations={[0, 0.297, 0.523, 1]}
            style={styles.actionBtn}
            >
            <Text style={styles.actionBtnText}>Yes</Text>
            </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate("Problem");
            }}
        >
            <LinearGradient
            colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
            locations={[0, 0.297, 0.523, 1]}
            style={styles.actionBtn}
            >
            <Text style={styles.actionBtnText}>No</Text>
            </LinearGradient>
        </TouchableOpacity>
      </Animated.View>


      <View
        style={{
          position: "absolute",
          zIndex: 250,
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
          zIndex: 250,
          top: 0,
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

export default SendProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
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
  titleContainer: {
    position: "absolute",
    top: 400,
    width: "80%",
    zIndex: 1,
  },
  title: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  plate: {
    width: 322,
    height: 265,
    position: "absolute",
    top: 390,
    left: 55,
    zIndex: 1,
  },
  plateBackground: {
    width: 322,
    height: 265,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  problem: {
    flex: 1,
    top: 30,
  },
  plateText: {
    fontFamily: "Rubik-Regular",
    color: "#00324A",
    fontSize: 24,
    lineHeight: 25,
    textAlign: "left",
  },
  plateRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  icon: {
    width: "25%",
    height: "100%",
    resizeMode: "contain",
    marginLeft: 14,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 150,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 1000,
  },
  actionBtn: {
    width: '100%',
    height: 57,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: '15%'
  },
  actionBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 28,
  },
});
