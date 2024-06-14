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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";
import PinkPlateMenu from "./PinkPlateMenu";
import { database, db } from "../components/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { ref, set } from "firebase/database";

const SendRequest = ({ navigation }) => {
  const [isConstruct, setIsConstruct] = useState(false);
  const [operation, setOperation] = useState("");
  const translation = useRef(new Animated.Value(0)).current;
  const nextTranslation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState("");
  const [friendName, setFriendName] = useState("");
  const [search, setSearch] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [deleteImage, setDeleteImage] = useState(null);

  const operationRef = useRef(operation);

  const iconList = [
    {
      id: 1,
      source: require("../../assets/addfriend/banana.png"),
      label: "Banana",
    },
    {
      id: 2,
      source: require("../../assets/addfriend/ananas.png"),
      label: "Ananas",
    },
    {
      id: 3,
      source: require("../../assets/addfriend/house.png"),
      label: "House",
    },
    {
      id: 4,
      source: require("../../assets/addfriend/apple.png"),
      label: "Apple",
    },
    {
      id: 5,
      source: require("../../assets/addfriend/horse.png"),
      label: "horse",
    },
    {
      id: 6,
      source: require("../../assets/addfriend/bear.png"),
      label: "Apple",
    },
    {
      id: 7,
      source: require("../../assets/addfriend/fish.png"),
      label: "Fish",
    },
    {
      id: 8,
      source: require("../../assets/addfriend/strawberry.png"),
      label: "Strawberry",
    },
    {
      id: 9,
      source: require("../../assets/addfriend/duck.png"),
      label: "Duck",
    },
    {
      id: 10,
      source: require("../../assets/addfriend/bamboo.png"),
      label: "Bamboo",
    },
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

  const handleButtonClick = () => {
    return;
    if (cursorPosition > 0) {
      const newText =
        text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
      setText(newText);
      setCursorPosition(cursorPosition - 1);
    }
  };

  const handleSelectionChange = ({ nativeEvent: { selection } }) => {
    setCursorPosition(selection.start);
  };

  // const fetchPost = async () => {
  //   try {
  //     await getDocs(collection(db, "Usernames")).then((querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       console.log("--------------", newData, "--------------");
  //     });
  //   } catch (error) {
  //     console.log("<-------------->", error, "<------------------>");
  //   }
  // };

  // const fetchFriend = async (username) => {
  //   try {
  //     // Create a query against the collection
  //     const userQuery = query(
  //       collection(db, "Usernames"),
  //       where("nickname", "==", username)
  //     );

  //     // Fetch the documents matching the query
  //     const querySnapshot = await getDocs(userQuery);

  //     if (querySnapshot.empty) {
  //       setIsButtonEnabled(false);
  //     } else {
  //       setIsButtonEnabled(friendName !== "");
  //     }

  //     // Extract the user data
  //     const userData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     console.log("--------------", userData, "--------------");

  //     // Optionally, you can return the user data if needed
  //     return userData;
  //   } catch (error) {
  //     console.log("<-------------->", error, "<------------------>");
  //   }
  // };

  const fetchFriend = async (name) => {
    // try {
    //   set(ref(database, "users/" + "1111"), {
    //     username: "aaaa",
    //     email: "aaa",
    //     profile_picture: "aaa",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // return;
    try {
      const usersCollection = collection(db, "Usernames");
      const userQuery = query(usersCollection, where("nickname", "==", name));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        setIsButtonEnabled(false);
        console.log("No matching documents.");
      } else {
        setIsButtonEnabled(friendName !== "");
        const userDoc = querySnapshot.docs[0];
        const user = { ...userDoc.data(), id: userDoc.id };
        console.log("--------------", user, "--------------");
        return user;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    // fetchFriend("William_bamboo");
  }, []);

  const handleSearch = async (text) => {
    // const results = await searchUserByName(name);
    fetchFriend(text);
    setFriendName(text);
  };

  const handleImagePress = (image) => {
    if (!selectedImage.includes(image)) {
      setSelectedImage((prevSelectedImages) => [...prevSelectedImages, image]);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage((prevSelectedImages) =>
      prevSelectedImages.filter((img) => img !== deleteImage)
    );
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
          <Text style={styles.plateTitle}>Add a Friend</Text>

          <View style={[styles.inputControl]}>
            <TouchableOpacity onPress={() => handleImageRemove()}>
              <Image
                source={require("../../assets/backBtn.png")}
                style={styles.backBtn}
              />
            </TouchableOpacity>

            {selectedImage?.length != 0 &&
              selectedImage?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={
                      deleteImage == item
                        ? styles.selectDelete
                        : styles.unselectDelete
                    }
                    onPress={() => {
                      if (deleteImage === item) {
                        setDeleteImage(null);
                      } else {
                        setDeleteImage(item);
                      }
                    }}
                  >
                    <Image
                      source={iconList[item]?.source}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}

            {/* <TextInput
              style={styles.inputControlInput}
              value={text}
              onChangeText={setText}
              onSelectionChange={handleSelectionChange}
            /> */}
          </View>
          <View style={styles.flexWrap}>
            <TouchableOpacity onPress={() => handleImagePress(0)}>
              <Image
                source={require("../../assets/boxBanana.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(1)}>
              <Image
                source={require("../../assets/ananasBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(2)}>
              <Image
                source={require("../../assets/homeBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(3)}>
              <Image
                source={require("../../assets/appleBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(4)}>
              <Image
                source={require("../../assets/hourseBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.flexWrapBottom}>
            <TouchableOpacity onPress={() => handleImagePress(5)}>
              <Image
                source={require("../../assets/bearBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(6)}>
              <Image
                source={require("../../assets/fishbox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(7)}>
              <Image
                source={require("../../assets/strawberryBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(8)}>
              <Image
                source={require("../../assets/duckBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImagePress(9)}>
              <Image
                source={require("../../assets/bamboBox.png")}
                style={styles.innerIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.flexDirecionFriendName]}>
            <Text style={styles.newFriendText}>Friend Name: </Text>
            <View style={styles.friendInput}>
              <TextInput
                style={styles.friendNameInput}
                value={friendName}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.shareBtnWrap}
            disabled={!isButtonEnabled}
          >
            <LinearGradient
              colors={
                isButtonEnabled
                  ? ["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]
                  : ["#cecdcd", "#a7a6a6", "#a5a4a4", "#a8a6a6"]
              }
              //   colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
              locations={[0, 0.297, 0.523, 1]}
              style={styles.shareBtn}
            >
              <Text style={styles.startBtnText}>Save</Text>
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
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginRight: 3,
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
  unselectDelete: [],
});
