import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, ImageBackground, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderWithMenu } from "../components/Headers";
import { auth, db, RecaptchaVerifier, PhoneAuthProvider } from "../components/firebase";
import { useUsername } from "../components/userContext";
import { signInWithCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

const getRandomIcons = (numIcons) => {
  const keys = Object.keys(iconList);
  const randomKeys = [];
  while (randomKeys.length < numIcons) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    if (!randomKeys.includes(randomKey)) {
      randomKeys.push(randomKey);
    }
  }
  return randomKeys.map((key) => ({ id: key, ...iconList[key] }));
};

const generateUniqueUserId = async (numIcons) => {
  let unique = false;
  let userIdIcons;

  while (!unique) {
    userIdIcons = getRandomIcons(numIcons);
    const userId = userIdIcons.map(icon => icon.id).join("-");
    const docRef = doc(db, "Usernames", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      unique = true;
    }
  }

  return userIdIcons;
};

const SignUpScreen = ({ navigation }) => {
  const { setUsername } = useUsername();
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [randomIcons, setRandomIcons] = useState([]);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    setIsButtonEnabled(nickname.trim() !== "" && phoneNumber.trim() !== "");
  }, [nickname, phoneNumber]);

  useEffect(() => {
    const fetchUniqueIcons = async () => {
      const uniqueIcons = await generateUniqueUserId(5);
      setRandomIcons(uniqueIcons);
    };

    fetchUniqueIcons();
  }, []);

  // Ensure RecaptchaVerifier is correctly initialized
  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          sendVerification();
        }
      }, auth);
      recaptchaVerifier.current.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);

  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      Alert.alert("Verification code has been sent to your phone.");
    } catch (error) {
      console.error("Error sending verification code: ", error);
      Alert.alert("Error", "Failed to send verification code: " + error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      const userId = randomIcons.map((icon) => icon.id).join("-");
      await setDoc(doc(db, "Usernames", userId), {
        nickname,
        phoneNumber,
        uid: user.uid,
      });

      setUsername(nickname);
      navigation.replace("SignIn");
    } catch (error) {
      console.error("Error signing up: ", error);
      Alert.alert("Error", "Failed to sign up: " + error.message);
    }
  };

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <ImageBackground
        source={require("../../assets/gears-background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <HeaderWithMenu />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topSection}>
            <Text style={[styles.labelText, { marginTop: 20 }]}>
              This is your user ID:
            </Text>

            <View style={styles.iconsRow}>
              {randomIcons.map((icon, index) => (
                <View key={index}>
                  <Image source={icon.source} style={styles.iconsRowIcon} />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Enter your phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 234 567 890"
              placeholderTextColor="#ccc"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Choose a nickname</Text>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={verificationId ? handleSignup : sendVerification}
              style={[
                styles.actionBtn,
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
                <Text style={styles.actionBtnText}>
                  {verificationId ? "Verify Code" : "Send Verification Code"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {verificationId && (
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Enter Verification Code</Text>
              <TextInput
                style={styles.input}
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
              />
            </View>
          )}
          <View id="recaptcha-container" />
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
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  iconsRowIcon: {
    marginHorizontal: 6,
    width: 40,
    height: 40,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  input: {
    height: 48,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    fontFamily: "Rubik-Regular",
    color: "#E8F8FF",
    fontSize: 28,
    lineHeight: 33,
    marginTop: 10,
    width: '70%',
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  actionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    fontSize: 20,
    textAlign: 'center',
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
