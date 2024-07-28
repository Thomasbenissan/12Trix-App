import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../../components/Headers";
import { BottomTabs } from "../../components/BottomTabs";
import { auth, db } from "../../components/firebase";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Import this

const SendRequest = ({ navigation, route }) => {
  const { myDocId, myNickname } = route.params;
  const [operation, setOperation] = useState("");
  const [friendName, setFriendName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [friendData, setFriendData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State for current user
  const operationRef = useRef(operation);

  const images = [
    { id: 1, label: "banana", source: require("../../../assets/boxBanana.png"), selectedSource: require("../../../assets/addfriend/banana.png") },
    { id: 2, label: "ananas", source: require("../../../assets/ananasBox.png"), selectedSource: require("../../../assets/addfriend/ananas.png") },
    { id: 3, label: "house", source: require("../../../assets/homeBox.png"), selectedSource: require("../../../assets/addfriend/house.png") },
    { id: 4, label: "apple", source: require("../../../assets/appleBox.png"), selectedSource: require("../../../assets/addfriend/apple.png") },
    { id: 5, label: "horse", source: require("../../../assets/hourseBox.png"), selectedSource: require("../../../assets/addfriend/horse.png") },
    { id: 6, label: "bear", source: require("../../../assets/bearBox.png"), selectedSource: require("../../../assets/addfriend/bear.png") },
    { id: 7, label: "fish", source: require("../../../assets/fishbox.png"), selectedSource: require("../../../assets/addfriend/fish.png") },
    { id: 8, label: "strawberry", source: require("../../../assets/strawberryBox.png"), selectedSource: require("../../../assets/addfriend/strawberry.png") },
    { id: 9, label: "duck", source: require("../../../assets/duckBox.png"), selectedSource: require("../../../assets/addfriend/duck.png") },
    { id: 10, label: "bamboo", source: require("../../../assets/bamboBox.png"), selectedSource: require("../../../assets/addfriend/bamboo.png") },
  ];

  useEffect(() => {
    operationRef.current = operation;
    console.log(operation);
  }, [operation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedIcons.length !== 5) {
      setIsButtonEnabled(false);
      console.log("Friend name or icons not fully specified.");
      return;
    }

    const fetchFriend = async () => {
      const userId = selectedIcons.map(icon => icon.id).join("-");
      console.log("Searching for:", userId);
      try {
        const docRef = doc(db, "Usernames", userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("No matching documents.");
          setIsButtonEnabled(false);
          setFriendData(null);
        } else {
          setIsButtonEnabled(true);
          const user = { ...docSnap.data(), id: docSnap.id };
          console.log("User found: ", user);
          setFriendData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsButtonEnabled(false);
      }
    };

    fetchFriend();
  }, [selectedIcons]);

  const handleSearch = (text) => {
    setFriendName(text);
  };

  const handleIconPress = (item) => {
    if (selectedIcons.length < 5) {
      setSelectedIcons([...selectedIcons, item]);
    }
  };

  const handleDeleteIcon = () => {
    if (selectedIcons.length > 0) {
      setSelectedIcons(selectedIcons.slice(0, -1));
    }
  };




  const handleRequest = async () => {
    if (!currentUser) {
        Alert.alert("Error", "User not authenticated.");
        return;
    }

    console.log('here')

    

    console.log(myDocId)

    const formattedSelectedIcons = selectedIcons.map(icon => icon.id).join("-");

    const docRef = doc(db, "Usernames", formattedSelectedIcons);
    const docSnap = await getDoc(docRef);
    
    console.log('here')


    if (!docSnap.exists()) {
        Alert.alert("Error", "User not found.");
        return;
    }

    if (!friendData) {
        Alert.alert("Error", "No friend selected.");
        return;
    }


    try {
        console.log("outgoing starting");
        // Add to the current user's outgoing friend requests
        const outgoingRequestsRef = doc(db, "Usernames", myDocId, "OutgoingFriendRequests", formattedSelectedIcons);
        console.log("outgoing starting");
        await setDoc(outgoingRequestsRef, {
            user_uid: friendData.uid,
            nickname: friendData.nickname,
        });
        console.log("outgoing done");

        // Add to the friend's incoming friend requests
        const incomingRequestsRef = doc(db, "Usernames", formattedSelectedIcons, "IncomingFriendRequests", myDocId);
        await setDoc(incomingRequestsRef, {
            user_uid: currentUser.uid,
            nickname: myNickname,
        });
        console.log("Incoming done");

        setSelectedIcons([]);
        setFriendName("");
        setIsButtonEnabled(false);
        navigation.push("FriendList", { animation: "leftToRight" });
    } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to send friend request.");
    }
  };

  const ImageButton = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Image source={item.source} style={styles.innerIcon} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <View style={styles.bgRobot}>
        <Image
          style={{ width: 529, height: 1321, objectFit: "contain" }}
          source={require("../../../assets/robot-3.png")}
        />
      </View>

      <View style={styles.plate}>
        <ImageBackground
          source={require("../../../assets/platefriend.png")}
          resizeMode="stretch"
          style={{ flex: 1 }}
        >
          <Text style={styles.plateTitle}>Add a Friend</Text>

          <View style={styles.inputControl}>
            <TouchableOpacity onPress={handleDeleteIcon}>
              <Image
                source={require("../../../assets/backBtn.png")}
                style={styles.backBtn}
              />
            </TouchableOpacity>

            {selectedIcons.length > 0 && (
              <View style={styles.iconWithNameContainer}>
                {selectedIcons.map((icon, index) => (
                  <Image
                    key={index}
                    source={icon.selectedSource}
                    style={styles.selectedIcon}
                  />
                ))}
              </View>
            )}
          </View>


          <View style={styles.flexDirectionFriendName}>
            <Text style={styles.newFriendText}>Friend Name: </Text>
            <View style={styles.friendInput}>
              <TextInput
                style={styles.friendNameInput}
                value={friendName}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          <View style={styles.flexWrap}>
            {images.map((item) => (
              <ImageButton
                key={item.id}
                item={item}
                onPress={handleIconPress}
                disabled={selectedIcons.length >= 5}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.shareBtnWrap}
            disabled={!isButtonEnabled}
            onPress={handleRequest}
          >
            <LinearGradient
              colors={
                isButtonEnabled
                  ? ["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]
                  : ["#cecdcd", "#a7a6a6", "#a5a4a4", "#a8a6a6"]
              }
              locations={[0, 0.297, 0.523, 1]}
              style={styles.shareBtn}
            >
              <Text style={styles.startBtnText}>Add Friend</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </View>

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

  selectedIcon: {
    height: 30,
    width: 40,
    resizeMode: 'contain',
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
    marginBottom: 10,
  },

  backBtn: {
    height: 40,
    width: 40,
    resizeMode: "contain",
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
  iconWithNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  friendNameText: {
    paddingRight: 10,
    fontSize: 20,
    color: "#081444",
  },

  flexDirectionFriendName: {
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
});
