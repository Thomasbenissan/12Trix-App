import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  Image,
  Easing,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OnboardingScreen = ({ navigation }) => {
  const translation = useRef(new Animated.Value(0)).current;
  const rotaion = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const fadeInOut = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotaion, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeInOut, {
          toValue: 210,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();

    // Animated.loop(
    //     Animated.sequence([
    //         Animated.timing(fadeInOut, {
    //             toValue: 0,
    //             duration: 2000,
    //             useNativeDriver: true,
    //             easing: Easing.linear
    //         }),
    //         Animated.timing(fadeInOut, {
    //             toValue: 200,
    //             duration: 2000,
    //             useNativeDriver: true,
    //             easing: Easing.linear
    //         }),
    //     ])
    // ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <ImageBackground
        source={require("../../assets/gears-background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.lightningRed,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <Image
            source={require("../../assets/lightning-red.png")}
            style={{ width: 52, height: 80, objectFit: "contain" }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.lightningYellow,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <Image
            source={require("../../assets/lightning-yellow.png")}
            style={{ width: 61, height: 105, objectFit: "contain" }}
          />
        </Animated.View>

        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <Animated.View
          style={[
            styles.robotView,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-400, -122.5],
                  }),
                },
                {
                  translateY: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-150, -50],
                  }),
                },
                {
                  scale: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0.76, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={{ position: "relative", width: 245, height: 612 }}>
            <TouchableOpacity
              onPress={() => navigation.push("UserSignIn")}
              style={{
                position: "absolute",
                width: 245,
                height: 612,
                top: 0,
                left: 0,
                zIndex: 60,
              }}
            ></TouchableOpacity>
            <Animated.View
              style={[
                styles.eye,
                {
                  left: 82.9,
                  transform: [
                    {
                      rotate: rotaion.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                style={{ width: 15.21, height: 15.21, objectFit: "contain" }}
                source={require("../../assets/eye-1.png")}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.eye,
                {
                  right: 83.6,
                  transform: [
                    {
                      rotate: rotaion.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                style={{ width: 15.21, height: 15.21, objectFit: "contain" }}
                source={require("../../assets/eye-2.png")}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.robot,
                {
                  opacity: fadeInOut.interpolate({
                    inputRange: [0, 100, 100.1, 199.9, 200],
                    outputRange: [1, 1, 0, 0, 1],
                  }),
                },
              ]}
            >
              <Image
                style={{ width: 245, height: 612 }}
                source={require("../../assets/robot-1.png")}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.robot,
                {
                  opacity: fadeInOut.interpolate({
                    inputRange: [0, 100, 100.1, 199.9, 200],
                    outputRange: [0, 0, 1, 1, 0],
                  }),
                },
              ]}
            >
              <Image
                style={styles.robot}
                source={require("../../assets/robot-2.png")}
              />
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bigGear,
            {
              transform: [
                { translateX: -62 },
                { translateY: 8 },
                {
                  rotate: rotaion.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/big-gear.png")}
            style={{ width: 88, height: 88, objectFit: "contain" }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.smallGear,
            {
              transform: [
                { translateX: 12 },
                { translateY: -52 },
                {
                  rotate: rotaion.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/small-gear.png")}
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
        </Animated.View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 50,
    width: 315,
    height: 120,
    objectFit: "contain",
    transform: [{ translateX: -157.5 }, { translateY: -290 }],
  },
  robotView: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 50,
  },
  robot: {
    width: 245,
    height: 612,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
  },
  bigGear: {
    width: 88,
    height: 88,
    position: "absolute",
    left: "50%",
    bottom: "50%",
    zIndex: 45,
  },
  smallGear: {
    width: 48,
    height: 48,
    position: "absolute",
    left: "50%",
    bottom: "50%",
    zIndex: 45,
  },
  lightningYellow: {
    width: 61,
    height: 105,
    position: "absolute",
    top: 38,
    right: 16,
    zIndex: 45,
  },
  lightningRed: {
    width: 52,
    height: 80,
    position: "absolute",
    top: 50,
    left: 52,
    zIndex: 45,
  },
  eye: {
    width: 15.21,
    height: 15.21,
    objectFit: "contain",
    position: "absolute",
    top: 102,
    zIndex: 55,
  },
});
