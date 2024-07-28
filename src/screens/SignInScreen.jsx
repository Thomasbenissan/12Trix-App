import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderWithMenu } from "../components/Headers";
import { useUsername } from "../components/userContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { signInAnonymously } from "firebase/auth";

const iconList = {
  1: { source: require("../../assets/addfriend/banana.png") },
  2: { source: require("../../assets/addfriend/ananas.png") },
  3: { source: require("../../assets/addfriend/house.png") },
  4: { source: require("../../assets/addfriend/apple.png") },
  5: { source: require("../../assets/addfriend/horse.png") },
  6: { source: require("../../assets/addfriend/bear.png") },
  7: { source: require("../../assets/addfriend/fish.png") },
  8: { source: require("../../assets/addfriend/strawberry.png") },
  9: { source: require("../../assets/addfriend/duck.png") },
  10: { source: require("../../assets/addfriend/bamboo.png") },
};

const SignInScreen = ({ navigation }) => {
  const { login } = useUsername(); // Use the updated context

  const [userIdIcons, setUserIdIcons] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(userIdIcons.length === 5);

    // Perform anonymous authentication on component mount
    signInAnonymously(auth)
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        console.error("Error during anonymous sign-in:", error);
      });
  }, [userIdIcons]);

  const handleSignIn = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      const userId = userIdIcons.map(icon => icon.id).join("-");
      const docRef = doc(db, "Usernames", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        login(userData); // Set the authenticated user state
        navigation.replace("Home");
      } else {
        Alert.alert("Error", "User ID does not exist");
      }
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert("Error", errorMessage);
    }
  };

  const handleIconPress = (iconId) => {
    if (userIdIcons.length < 5) {
      const selectedIcon = { id: iconId, source: iconList[iconId].source };
      setUserIdIcons([...userIdIcons, selectedIcon]);
    }
  };

  const handleDeleteIcon = () => {
    if (userIdIcons.length > 0) {
      setUserIdIcons(userIdIcons.slice(0, -1));
    }
  };

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <ImageBackground
        source={require("../../assets/gears-background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
          <HeaderWithMenu />

          <Text style={[styles.labelText, { marginTop: 64, marginBottom: 17 }]}>
            Sign in with a{"\n"}12trix subscription
          </Text>
          <Image
            source={require("../../assets/12-trix-icon.png")}
            style={styles.icon}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
            <Text style={[styles.labelText, { marginTop: 30 }]}>User ID:</Text>
            <View style={styles.userIdContainer}>
              {userIdIcons.map((icon, index) => (
                <Image key={index} source={icon.source} style={styles.userIdIcon} />
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={handleDeleteIcon} style={styles.deleteButton}>
            <Image
              source={require("../../assets/backBtn.png")}
              style={{ height: 50, resizeMode: 'contain', marginTop: 10 }}
            />
          </TouchableOpacity>

          <View style={styles.iconsRow}>
            {Object.keys(iconList).slice(0, 5).map((key) => (
              <TouchableOpacity key={key} onPress={() => handleIconPress(key)}>
                <Image source={iconList[key].source} style={styles.iconsRowIcon} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.iconsRow}>
            {Object.keys(iconList).slice(5, 10).map((key) => (
              <TouchableOpacity key={key} onPress={() => handleIconPress(key)}>
                <Image source={iconList[key].source} style={styles.iconsRowIcon} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ position: "relative", marginTop: 20 }}>
            <TouchableOpacity
              onPress={handleSignIn}
              style={[
                styles.actionBtn,
                { alignSelf: "center" },
                !isButtonEnabled && styles.disabledActionBtn,
              ]}
              disabled={!isButtonEnabled}
            >
              <LinearGradient
                colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
                locations={[0, 0.297, 0.523, 1]}
                style={styles.actionBtn}
              >
                <Text style={styles.actionBtnText}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("SignUp")}>
              <Text
                style={[styles.signupText, { marginTop: 0, marginBottom: 17 }]}
              >
                or Signup
              </Text>
            </TouchableOpacity>

            <Image
              style={styles.robot}
              source={require("../../assets/robot-1.png")}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    flex: 1,
  },
  labelText: {
    fontFamily: "Rubik-Regular",
    color: "#E8F8FF",
    fontSize: 28,
    lineHeight: 33,
    textAlign: "center",
  },
  icon: {
    width: 74,
    height: 35,
    objectFit: "contain",
    alignSelf: "center",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    flexWrap: "wrap",
  },
  iconsRowIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  userIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  userIdIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  deleteButton: {
    transform: [{ scaleX: -1 }],
    position: 'fixed',
    top: -58,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  actionBtn: {
    width: 215,
    height: 57,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 28,
  },
  disabledActionBtn: {
    opacity: 0.5,
  },
  robot: {
    width: 220,
    height: 550,
    objectFit: "contain",
    position: "absolute",
    top: 88,
    left: "50%",
    transform: [{ translateX: -110 }],
  },
  signupText: {
    fontFamily: "Rubik-Regular",
    color: "#ffff",
    fontSize: 18,
    lineHeight: 33,
    textAlign: "center",
  },
});

export default SignInScreen;
