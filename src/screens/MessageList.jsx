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
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";
import PinkPlateMenu from "./PinkPlateMenu";
import { auth, database, db } from "../components/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { get, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const SendRequest = ({ navigation, route }) => {
  const { items } = route?.params;
  const { plateOne, plateTwo, plateThree, plateFour, plateFive } = useSelector(
    (state) => state.userReducer
  );
  const [operation, setOperation] = useState("");

  const [messageList, setMessageList] = useState([]);

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const usersRef = ref(
          database,
          "chatRoom/" +
            auth?.currentUser?.uid +
            "/" +
            items?.user_uid +
            "/messages"
        );

        get(usersRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const messages = snapshot.val();

              setMessageList(Object.values(messages));
            } else {
              console.log("No users available");
              setMessageList([]); // Set empty array if no users
            }
          })
          .catch((error) => {
            console.error("Error fetching users: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    // Clean up function for unmounting or dependencies change
    return () => {
      // Clean up any resources if needed
    };
  }, []);

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <View style={styles.bgRobot}>
        <Image
          style={{ width: 529, height: 1321, objectFit: "contain" }}
          source={require("../../assets/robot-3.png")}
        />
      </View>

      <View style={styles.plate}>
        <Text style={styles.plateTitle}>Problems sent to me</Text>
        <View style={styles.innerPlate}>
          {messageList?.length > 0 ? (
            <FlatList
              data={messageList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <ImageBackground
                    source={require("../../assets/plate2.png")}
                    resizeMode="contain"
                    style={{
                      height: 265,
                      marginBottom: 20,
                    }}
                  >
                    <Text style={styles.nameTxt}>
                      From {items?.nickname.split("_")[0]}
                    </Text>

                    <View style={styles.flexDirection}>
                      <Image
                        source={imageMap[item?.plateOne]}
                        style={styles.imageIcon}
                      />

                      <Image
                        source={numberImageMap[item?.plateTwo]}
                        style={styles.imageIcon}
                      />

                      <Image
                        source={yellowPlateImageMap[item?.plateThree]}
                        style={styles.imageIcon}
                      />
                    </View>

                    <View style={styles.flexDirection}>
                      <Image
                        source={greenPlateImageMap[item?.plateFive]}
                        style={styles.imageIcon}
                      />

                      <Image
                        source={bluePlateImageMap[item?.plateFour]}
                        style={styles.imageIcon}
                      />
                    </View>
                  </ImageBackground>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.problemTxt}>No Problems Available</Text>
          )}
        </View>
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

export default SendRequest;

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
    position: "absolute",
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
    alignSelf: "center",
    marginLeft: 17,
    marginBottom: 30,
    marginTop: 20,
  },

  newFriendText: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 18,
  },

  friendListText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 18,
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
    // marginBottom: 6,
    marginTop: 30,
    marginLeft: 15,
    top: 380,
  },

  nameTxt: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 20,
    lineHeight: 32,
    textAlign: "center",
    // marginBottom: 6,
    marginTop: 15,
  },

  problemTxt: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 20,
    lineHeight: 32,
    textAlign: "center",
    // marginBottom: 6,
    marginTop: 100,
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
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginRight: 3,
    marginBottom: 10,
  },

  backBtn: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    // marginRight: 3,
  },

  inputControl: {
    width: 238,
    height: 40,
    borderBottomColor: "#081444",
    borderBottomWidth: 2,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  inputControlLabel: {
    fontFamily: "Rubik-Regular",
    color: "#081444",
    fontSize: 20,
    lineHeight: 24,
  },
  inputControlInput: {
    fontFamily: "Rubik-Regular",
    color: "#081444",
    fontSize: 20,
    lineHeight: 24,
    flex: 1,
    paddingLeft: 10,
  },

  flexWrap: {
    flexDirection: "row",
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    flexWrap: "wrap",
  },
  flexWrapBottom: {
    flexDirection: "row",
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  flexDirecionFriendName: {
    width: 238,

    height: 33,
    borderBottomColor: "#081444",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },

  friendInput: {
    borderBottomWidth: 2,
    flex: 1,
  },

  friendNameInput: {
    fontFamily: "Rubik-Regular",
    color: "#081444",
    fontSize: 20,
    lineHeight: 24,
    flex: 1,
    paddingLeft: 10,
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
    marginTop: 20,
  },

  selectDelete: {
    borderWidth: 1,
    borderColor: "#081444",
    borderRadius: 100,
    padding: 5,
  },
  innerPlate: {
    width: 322,
    height: 265,
    // position: "absolute",
    top: 400,

    left: "52%",
    zIndex: 1,
    transform: [{ translateX: -161 }],
  },

  flexDirection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imageIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
