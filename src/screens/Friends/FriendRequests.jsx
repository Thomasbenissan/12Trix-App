import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../../components/Headers";
import { BottomTabs } from "../../components/BottomTabs";
import { auth, db } from "../../components/firebase";
import { getDocs, collection, doc, query, where } from "firebase/firestore";

const FriendRequests = ({ navigation, route}) => {
  const { myDocId } = route.params;
  const [incomingRequests, setIncomingRequests] = useState([]);

  const iconList = {
    1: { source: require("../../../assets/addfriend/banana.png") },
    2: { source: require("../../../assets/addfriend/ananas.png") },
    3: { source: require("../../../assets/addfriend/house.png") },
    4: { source: require("../../../assets/addfriend/apple.png") },
    5: { source: require("../../../assets/addfriend/horse.png") },
    6: { source: require("../../../assets/addfriend/bear.png") },
    7: { source: require("../../../assets/addfriend/fish.png") },
    8: { source: require("../../../assets/addfriend/strawberry.png") },
    9: { source: require("../../../assets/addfriend/duck.png") },
    10: { source: require("../../../assets/addfriend/bamboo.png") },
  };

  

    

    useEffect(() => {
    const fetchIncomingRequests = async () => {
        try {
          console.log(myDocId)
          if (!myDocId) return;
          console.log('here')
          const userDocRef = doc(db, "Usernames", myDocId);
          const incomingRequestsRef = collection(userDocRef, "IncomingFriendRequests");
          const querySnapshot = await getDocs(incomingRequestsRef);

          const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setIncomingRequests(requests);
        } catch (error) {
        console.error("Error fetching incoming friend requests:", error);
        }
    };

    fetchIncomingRequests();
    }, []);


    const renderFriendRequest = ({ item }) => (
        <View style={styles.requestContainer} key={item.id}>
          <Text style={styles.nicknameText}>{item.nickname}</Text>
          <View style={styles.iconContainer}>
            {item.iconDict.map((iconId, index) => (
              <Image
                key={index}
                source={iconList[iconId].source}
                style={styles.icon}
              />
            ))}
          </View>
          <TouchableOpacity onPress={() => handleAcceptRequest(item)}>
            <Text style={styles.acceptButton}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeclineRequest(item)}>
            <Text style={styles.declineButton}>Decline</Text>
          </TouchableOpacity>
        </View>
      );
      

  const handleAcceptRequest = (request) => {
    // Logic to accept the friend request
  };

  const handleDeclineRequest = (request) => {
    // Logic to decline the friend request
  };

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
          <Text style={styles.plateTitle}>Friend Requests</Text>
          {incomingRequests.length > 0 ? (
            <FlatList
              data={incomingRequests}
              renderItem={renderFriendRequest}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.noRequestsText}>No friend requests</Text>
          )}
        </ImageBackground>
      </View>

      <View style={styles.header}>
        <HomeHeader />
      </View>

      <View style={styles.footer}>
        <BottomTabs navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

export default FriendRequests;

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
    transform: [{ translateX: -161 }],
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
  noRequestsText: {
    fontFamily: "Rubik-Regular",
    color: "#001744",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 20,
  },
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  nicknameText: {
    fontFamily: "Rubik-Regular",
    color: "#001744",
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 35,
    height: 35,
    marginHorizontal: 5,
  },
  acceptButton: {
    fontFamily: "Rubik-Regular",
    color: "#4CAF50",
    fontSize: 16,
  },
  declineButton: {
    fontFamily: "Rubik-Regular",
    color: "#F44336",
    fontSize: 16,
  },
  header: {
    position: "absolute",
    zIndex: 250,
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
  },
  footer: {
    position: "absolute",
    zIndex: 250,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
  },
});
