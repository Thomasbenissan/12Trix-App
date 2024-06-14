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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";
import PinkPlateMenu from "./PinkPlateMenu";

const HomeScreen = ({ navigation }) => {
  const [isConstruct, setIsConstruct] = useState(false);
  const [operation, setOperation] = useState("");
  const translation = useRef(new Animated.Value(0)).current;
  const nextTranslation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const operationRef = useRef(operation);

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

  const shakePlusMinus = () => {
    shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMinusPress = () => {
    setOperation("minus");
    onNextTranslate();
  };

  const handlePlusPress = () => {
    setOperation("plus");
    onNextTranslate();
  };

  return (
    <LinearGradient colors={["#011E57", "#001744"]} style={styles.container}>
      <View style={styles.bgRobot}>
        <Image
          style={{ width: 529, height: 1321, objectFit: "contain" }}
          source={require("../../assets/robot-3.png")}
        />

        <Animated.View
          style={[
            styles.thermostat,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 370],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/thermostat.png")}
            style={{ width: 163, height: 112 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.ekg,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 470],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/ekg.png")}
            style={{ width: 114, height: 112 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.plate,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-146, 270],
                  }),
                },
              ],
            },
          ]}
        >
          <ImageBackground
            source={require("../../assets/plate.png")}
            resizeMode="contain"
            style={{ width: 292, height: 199 }}
          ></ImageBackground>
        </Animated.View>

        <Animated.View
          style={[
            styles.panel,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-82.5, 370],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/panel.png")}
            style={{ width: 165, height: 81 }}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.plate,
            {
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
              transform: [
                { translateX: -146 },
                {
                  translateY: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -96],
                  }),
                },
              ],
            },
          ]}
        >
          <ImageBackground
            source={require("../../assets/plate.png")}
            resizeMode="contain"
            style={{
              width: 292,
              height: 199,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={styles.plateTitle}>Construct a Problem!</Text>
            <Text style={styles.plateText}>
              Select the + or - for addition or subtraction click each numbers
              to build the problem
            </Text>
          </ImageBackground>
        </Animated.View>

        <Animated.View
          style={[
            styles.circleBtnCont,
            {
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-124, -62],
                  }),
                },
                { translateX: shakeAnimation },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={handleMinusPress}
          >
            <Image
              source={require("../../assets/minus-btn.png")}
              style={[styles.circleBtn, { opacity: isConstruct ? 0 : 1 }]}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.circleBtnCont,
            {
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-46, 16],
                  }),
                },
                { translateX: shakeAnimation },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={handlePlusPress}
          >
            <Image
              source={require("../../assets/plus-btn.png")}
              style={[styles.circleBtn, { opacity: isConstruct ? 0 : 1 }]}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-136, -155],
                  }),
                },
                {
                  translateY: isConstruct
                    ? nextTranslation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [100, 160],
                      })
                    : translation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 160],
                      }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={shakePlusMinus}
          >
            <ImageBackground
              source={require("../../assets/btn-5.png")}
              resizeMode="contain"
              style={styles.coloredBtn}
            >
              <Text style={styles.coloredBtnText}>5</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-80, -90],
                  }),
                },
                {
                  translateY: isConstruct
                    ? nextTranslation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [100, 160],
                      })
                    : translation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 160],
                      }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={shakePlusMinus}
          >
            <ImageBackground
              source={require("../../assets/btn-4.png")}
              resizeMode="contain"
              style={styles.coloredBtn}
            >
              <Text style={styles.coloredBtnText}>4</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              transform: [
                { translateX: -24 },
                {
                  translateY: isConstruct
                    ? nextTranslation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [100, 160],
                      })
                    : translation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 160],
                      }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={shakePlusMinus}
          >
            <ImageBackground
              source={require("../../assets/btn-3.png")}
              resizeMode="contain"
              style={styles.coloredBtn}
            >
              <Text style={styles.coloredBtnText}>3</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [32, 42],
                  }),
                },
                {
                  translateY: isConstruct
                    ? nextTranslation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [100, 160],
                      })
                    : translation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 160],
                      }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={shakePlusMinus}
          >
            <ImageBackground
              source={require("../../assets/btn-2.png")}
              resizeMode="contain"
              style={styles.coloredBtn}
            >
              <Text style={styles.coloredBtnText}>2</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              transform: [
                {
                  translateX: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [88, 108],
                  }),
                },
                {
                  translateY: isConstruct
                    ? nextTranslation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [100, 160],
                      })
                    : translation.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 160],
                      }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 48, height: 48 }}
            onPress={shakePlusMinus}
          >
            <ImageBackground
              source={require("../../assets/btn-1.png")}
              resizeMode="contain"
              style={styles.coloredBtn}
            >
              <Text style={styles.coloredBtnText}>1</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.startBtnCont,
            {
              transform: [
                { translateX: -107.5 },
                {
                  translateY: translation.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 240],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={onTranslate}>
            <LinearGradient
              colors={["#fedaec", "#fb61ae", "#e74194", "#fb61ae"]}
              locations={[0, 0.297, 0.523, 1]}
              style={styles.startBtn}
            >
              <Text style={styles.startBtnText}>Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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

export default HomeScreen;

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
    width: 292,
    height: 199,
    position: "absolute",
    top: 582,
    left: "50%",
    zIndex: 150,
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
    width: 215,
    height: 57,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
  },
  startBtnText: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 28,
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
    fontSize: 28,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 6,
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
});
