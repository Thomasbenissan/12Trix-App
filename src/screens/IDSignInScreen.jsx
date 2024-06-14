import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderWithMenu } from "../components/Headers";
import { db } from "../components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UsernameContext } from "../components/userContext";

const iconList = [
  {
    id: "bamboo",
    source: require("../../assets/bamboo-icon.png"),
    label: "bamboo",
  },
  { id: "duck", source: require("../../assets/duck-icon.png"), label: "duck" },
  { id: "bear", source: require("../../assets/bear-icon.png"), label: "bear" },
  { id: "fish", source: require("../../assets/fish-icon.png"), label: "fish" },
  {
    id: "apple",
    source: require("../../assets/apple-icon.png"),
    label: "apple",
  },
];

const IDSignInScreen = ({ navigation }) => {
  const { setUsername } = useContext(UsernameContext);
  const [nickname, setNickname] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(nickname.trim() !== "" && selectedIcon !== null);
  }, [nickname, selectedIcon]);

  const saveNickname = async () => {
    const fullNickname = `${nickname}_${selectedIcon}`;

    try {
      const docRef = doc(db, "Usernames", fullNickname);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        Alert.alert("Error", "This nickname has already been used.");
      } else {
        await setDoc(docRef, { nickname: fullNickname });
        setUsername(fullNickname); // Set the username in context
        // Alert.alert("Success", "Nickname saved successfully!");
        // navigation.replace("Home");
        navigation.replace("UserSignUp");
      }
    } catch (error) {
      console.error("Error saving nickname to Firestore: ", error);
      Alert.alert("Error", "Failed to save nickname. Please try again.");
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

          <Text style={[styles.labelText, { marginTop: 110 }]}>
            This is your user ID:
          </Text>

          <View style={styles.iconsRow}>
            {iconList.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                onPress={() => setSelectedIcon(icon.label)}
              >
                <Image
                  source={icon.source}
                  style={[
                    styles.iconsRowIcon,
                    selectedIcon === icon.label && styles.selectedIcon,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.labelText]}>Choose a nickname</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />

          <View style={{ position: "relative", marginTop: 61 }}>
            <TouchableOpacity
              onPress={saveNickname}
              style={[
                styles.actionBtn,
                { alignSelf: "center" },
                !isButtonEnabled && styles.disabledActionBtn,
              ]}
              disabled={!isButtonEnabled}
            >
              <LinearGradient
                colors={
                  isButtonEnabled
                    ? ["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]
                    : ["#8e8e8e", "#8e8e8e", "#8e8e8e", "#8e8e8e"]
                }
                locations={[0, 0.297, 0.523, 1]}
                style={styles.actionBtn}
              >
                <Text style={styles.actionBtnText}>Save</Text>
              </LinearGradient>
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

export default IDSignInScreen;

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
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 132,
  },
  iconsRowIcon: {
    objectFit: "contain",
    marginHorizontal: 6,
    width: 40,
    height: 40,
  },
  selectedIcon: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
  },
  input: {
    height: 48,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    fontFamily: "Rubik-Regular",
    color: "#E8F8FF",
    fontSize: 28,
    lineHeight: 33,
    marginTop: 22,
    width: 238,
    alignSelf: "center",
    textAlign: "center",
  },
  actionBtn: {
    width: 215,
    height: 57,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledActionBtn: {
    opacity: 0.5,
  },
  actionBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 28,
  },
  robot: {
    width: 157,
    height: 393,
    objectFit: "contain",
    position: "absolute",
    top: 88,
    left: "50%",
    transform: [{ translateX: -78.5 }],
  },
});
