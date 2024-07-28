import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Easing,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "../components/Headers";
import { BottomTabs } from "../components/BottomTabs";

import PinkPlateMenu from "./PinkPlateMenu";
import OrangePlateMenu from "./OrangePlateMenu";
import YellowPlateMenu from "./YellowPlateMenu";
import BluePlateMenu from "./BluePlateMenu";
import GreenPlateMenu from "./GreenPlateMenu";
import { useDispatch } from "react-redux";
import {
  PlateFiveAction,
  PlateFourAction,
  PlateOneAction,
  PlateThreeAction,
  PlateTwoAction,
} from "../redux/actions";

const ProblemScreen = ({ navigation, route }) => {
  const { operation } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Operation updated:", operation);
    // Perform any actions that need to happen when operation changes
  }, [operation]);

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [guess, setGuess] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  const [modalVisible, setModalVisible] = useState(false);

  const translation = useRef(new Animated.Value(0)).current;
  const menuTranslation = useRef(new Animated.Value(0)).current;
  const result = useRef(new Animated.Value(0)).current;
  const [activeButton, setActiveButton] = useState(1);
  const [activeMenu, setActiveMenu] = useState("");
  const [plateOne, setPlateOne] = useState("");
  const [plateTwo, setPlateTwo] = useState("");
  const [plateThree, setPlateThree] = useState("");
  const [plateFour, setPlateFour] = useState("");
  const [plateFive, setPlateFive] = useState("");
  const timeoutId = useRef(null);
  const [isResultChecked, setIsResultChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    let animation;

    if (plateFive !== "") {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(translation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(translation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      );

      animation.start();
    } else {
      // This stops the animation if plateFive becomes empty
      if (animation) {
        animation.stop();
      }
      translation.setValue(0); // Reset the translation to the initial state if needed
    }

    // Cleanup function to stop the animation when the component unmounts or the effect reruns
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [plateFive, translation]);

  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [activeButton]);

  useEffect(() => {
    if (plateOne && plateTwo && plateThree && plateFour && plateFive) {
      setActiveButton(0);
    } else if (plateOne && plateTwo && plateThree && plateFour) {
      setActiveButton(5);
    } else if (plateOne && plateTwo && plateThree) {
      setActiveButton(4);
    } else if (plateOne && plateTwo) {
      setActiveButton(3);
    } else if (plateOne) {
      setActiveButton(2);
    }
  }, [plateOne, plateTwo, plateThree, plateFour, plateFive]);

  const defineCorrectAnswer = () => {
    const num1Number = parseInt(num1, 10);
    const num2Number = parseInt(num2, 10);

    const answer =
      operation === "minus" ? num1Number - num2Number : num1Number + num2Number;
    console.log(operation);
    console.log(answer);
    setCorrectAnswer(answer);
  };

  checkCorrectAnswer = (val) => {
    val === correctAnswer
      ? setIsAnswerCorrect(true)
      : setIsAnswerCorrect(false);
    setIsResultChecked(true);
  };

  const resultTransition = () => {
    Animated.timing(result, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("SendProblem", {
        plateOne,
        plateTwo,
        plateThree,
        plateFour,
        plateFive,
      });
    });
  };
  const stopResultTransition = () => {
    result.stopAnimation();
    clearTimeout(timeoutId.current);
  };

  const resetAll = () => {
    setActiveButton(1);
    setPlateOne("");
    setPlateTwo("");
    setPlateThree("");
    setPlateFour("");
    setPlateFive("");
  };

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

  const toggleMenuTranslation = (menuName, toValue) => {
    setActiveMenu(menuName);
    Animated.timing(menuTranslation, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const getMenuComponent = () => {
    switch (activeMenu) {
      case "pink":
        return (
          <PinkPlateMenu
            style={styles.plateMenu}
            onItemPress={(val) => {
              setPlateOne(val);
              dispatch(PlateOneAction(val));
              toggleMenuTranslation("pink", 0);
            }}
          />
        );
      case "orange":
        return (
          <OrangePlateMenu
            style={styles.plateMenu}
            onItemPress={(val) => {
              setPlateTwo(val);
              dispatch(PlateTwoAction(val));

              toggleMenuTranslation("orange", 0);
              setNum1(val);
              console.log(val);
            }}
          />
        );
      case "yellow":
        return (
          <YellowPlateMenu
            style={styles.plateMenu}
            onItemPress={(val) => {
              setPlateThree(val);
              dispatch(PlateThreeAction(val));
              toggleMenuTranslation("yellow", 0);
            }}
          />
        );
      case "blue":
        return (
          <BluePlateMenu
            style={styles.plateMenu}
            onItemPress={(val) => {
              setPlateFour(val);
              dispatch(PlateFourAction(val));

              toggleMenuTranslation("blue", 0);
            }}
            operation={operation}
          />
        );
      case "green":
        return (
          <GreenPlateMenu
            style={styles.plateMenu}
            onItemPress={(val) => {
              setPlateFive(val);
              dispatch(PlateFiveAction(val));
              toggleMenuTranslation("green", 0);
              setNum2(val);
              console.log(val);
            }}
          />
        );
      default:
        return null;
    }
  };

  const ColoredButton = ({ source, label, index, onPress, isActive }) => (
    <Animated.View
      style={[
        styles.coloredBtnCont,
        {
          transform: [
            { translateX: -155 + index * 66 },
            { translateY: 150 },
            { scale: isActive ? scaleAnimation : 1 },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={{ width: 48, height: 48 }}
        onPress={onPress}
        disabled={activeButton != label}
      >
        <ImageBackground
          source={source}
          resizeMode="contain"
          style={styles.coloredBtn}
        >
          <Text style={styles.coloredBtnText}>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );

  const buttons = [
    { source: require("../../assets/btn-5.png"), label: 5, menuName: "green" },
    { source: require("../../assets/btn-4.png"), label: 4, menuName: "blue" },
    { source: require("../../assets/btn-3.png"), label: 3, menuName: "yellow" },
    { source: require("../../assets/btn-2.png"), label: 2, menuName: "orange" },
    { source: require("../../assets/btn-1.png"), label: 1, menuName: "pink" },
  ];

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
          source={require("../../assets/plate2.png")}
          resizeMode="contain"
          style={{
            width: 322,
            height: 265,
            paddingHorizontal: 32,
            paddingVertical: 12,
          }}
        >
          <Text style={styles.plateTitle}>Problem construction</Text>
  
          <View style={{ flex: 1 }}>
            <View style={[styles.plateRow]}>
              {plateOne && (
                <>
                  <Image
                    source={imageMap[plateOne]}
                    style={{
                      width: "25%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={[styles.plateText, { marginLeft: 14 }]}>
                    had
                  </Text>
                </>
              )}
  
              {plateOne && plateTwo && (
                <Image
                  source={numberImageMap[plateTwo]}
                  style={{
                    width: "15%",
                    height: "100%",
                    resizeMode: "contain",
                    marginLeft: 14,
                  }}
                />
              )}
  
              {plateOne && plateTwo && plateThree && (
                <Image
                  source={yellowPlateImageMap[plateThree]}
                  style={{
                    width: "25%",
                    height: "100%",
                    resizeMode: "contain",
                    marginLeft: 14,
                  }}
                />
              )}
            </View>
  
            <View
              style={[
                styles.plateRow,
                { justifyContent: "center", marginTop: 20 },
              ]}
            >
              {plateOne && plateTwo && plateThree && plateFour && plateFive && (
                <>
                  <Image
                    source={greenPlateImageMap[plateFive]}
                    style={{
                      width: "15%",
                      height: "100%",
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                  />
                  <Image
                    source={yellowPlateImageMap[plateThree]}
                    style={{
                      width: "20%",
                      height: "100%",
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                  />
                </>
              )}
              {plateOne && plateTwo && plateThree && plateFour && (
                <>
                  <Text
                    style={[
                      styles.plateText,
                      { fontSize: 14, width: "35%", marginRight: 10 },
                    ]}
                  >
                    {plateFour}
                  </Text>
                  <Image
                    source={bluePlateImageMap[plateFour]}
                    style={{
                      width: "20%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </>
              )}
            </View>
  
            {plateOne && plateTwo && plateThree && plateFour && plateFive && (
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
            )}
          </View>
        </ImageBackground>
      </View>
  
      {!isResultChecked && (
        <>
          {buttons.map((button, index) => (
            <ColoredButton
              key={button.label}
              source={button.source}
              label={button.label}
              index={index}
              menuTranslation={menuTranslation}
              onPress={() => toggleMenuTranslation(button.menuName, 100)}
              isActive={activeButton === button.label}
            />
          ))}
        </>
      )}
  
      {!isResultChecked ? (
        <>
          <View
            style={[
              styles.coloredBtnCont,
              {
                transform: [{ translateX: -126 }, { translateY: 210 }],
              },
            ]}
          >
            <TouchableOpacity
              style={{ width: 55, height: 52 }}
              onPress={() => {
                resetAll(), stopResultTransition();
              }}
            >
              <Image
                source={require("../../assets/sound-btn.png")}
                style={{ width: 55, height: 52 }}
              />
            </TouchableOpacity>
          </View>
  
          <Animated.View
            style={[
              styles.coloredBtnCont,
              {
                width: 60,
                height: 60,
                top: 725,
                transform: [
                  {
                    scale: translation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  },
                  {
                    translateX: translation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, -25],
                    }),
                  },
                ],
                transformOrigin: "center center",
              },
            ]}
          >
            <TouchableOpacity
              style={{ width: 60, height: 60 }}
              onPress={() => {
                setModalVisible(true);
                defineCorrectAnswer();
              }}
            >
              <Image
                source={require("../../assets/guess-btn.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </Animated.View>
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalBg}>
              <ImageBackground
                source={require("../../assets/plate3.png")}
                resizeMode="contain"
                style={styles.numPadModalView}
              >
                <View
                  style={{
                    width: 360,
                    height: 320,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -180 }, { translateY: -160 }],
                  }}
                >
                  {numbers.map((number) => (
                    <TouchableOpacity
                      key={number}
                      style={styles.numPadBtnCont}
                      onPress={() => {
                        setModalVisible(false);
                        if (number == correctAnswer) {
                          setIsResultChecked(true);
                          setIsAnswerCorrect(true);
                          resultTransition();
                        } else {
                          setGuess(number);
                          setIsResultChecked(true);
                          setIsAnswerCorrect(false);
                          resultTransition();
                        }
                      }}
                    >
                      <ImageBackground
                        source={require("../../assets/blue-btn.png")}
                        resizeMode="contain"
                        style={styles.numPadBtn}
                      >
                        <Text style={styles.numPadBtnText}>{number}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              </ImageBackground>
            </View>
          </Modal>
  
          <View
            style={[
              styles.coloredBtnCont,
              {
                transform: [{ translateX: 76 }, { translateY: 210 }],
              },
            ]}
          >
            <TouchableOpacity
              style={{ width: 55, height: 52 }}
              onPress={() => {
                setActiveButton(activeButton - 1);
              }}
            >
              <Image
                source={require("../../assets/forward-btn.png")}
                style={{ width: 55, height: 52, transform: [{ scaleX: -1 }] }}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : isAnswerCorrect ? (
        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              width: 42,
              height: 42,
              top: 684,
              transform: [
                {
                  scale: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 2],
                  }),
                },
                {
                  translateX: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-21, -9],
                  }),
                },
                {
                  translateY: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [8, 8],
                  }),
                },
              ],
              transformOrigin: "center center",
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 42, height: 42 }}
            onPress={() => {
              navigation.navigate("SendProblem", {
                plateOne,
                plateTwo,
                plateThree,
                plateFour,
                plateFive,
              });
            }}
          >
            <ImageBackground
              source={require("../../assets/right-btn.png")}
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.numPadBtnText}>{correctAnswer}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.coloredBtnCont,
            {
              width: 42,
              height: 42,
              top: 684,
              transform: [
                {
                  scale: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 2],
                  }),
                },
                {
                  translateX: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-21, -9],
                  }),
                },
                {
                  translateY: result.interpolate({
                    inputRange: [0, 100],
                    outputRange: [8, 8],
                  }),
                },
              ],
              transformOrigin: "center center",
            },
          ]}
        >
          <TouchableOpacity
            style={{ width: 42, height: 42 }}
            onPress={() => {
              navigation.navigate("SendProblem", {
                plateOne,
                plateTwo,
                plateThree,
                plateFour,
                plateFive,
              });
            }}
          >
            <ImageBackground
              source={require("../../assets/wrong-btn.png")}
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.numPadBtnText}>{guess}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>
      )}
  
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
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <BottomTabs navigation={navigation} />
      </View>
  
      <Animated.View
        style={{
          transform: [
            {
              translateX: menuTranslation.interpolate({
                inputRange: [0, 100],
                outputRange: [400, 0],
              }),
            },
          ],
          zIndex: 3,
        }}
      >
        <Pressable
          onPress={() => toggleMenuTranslation(activeMenu, 0)}
          style={{ flex: 1 }}
        >
          {getMenuComponent()}
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );  
};

export default ProblemScreen;

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
    width: 322,
    height: 265,
    position: "absolute",
    top: 390,
    left: "50%",
    zIndex: 1,
    transform: [{ translateX: -161 }],
  },
  plateTitle: {
    fontFamily: "Rubik-ExtraBold",
    color: "#001744",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  plateText: {
    fontFamily: "Rubik-Regular",
    color: "#00324A",
    fontSize: 24,
    lineHeight: 25,
    textAlign: "left",
  },
  coloredBtnCont: {
    width: 48,
    height: 48,
    position: "absolute",
    top: 520,
    left: "50%",
    zIndex: 2,
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
  plateMenu: {
    width: 391,
    height: 755,
    position: "absolute",
    top: 90,
    left: "50%",
    transform: [{ translateX: -195.5 }],
  },
  plateRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.9)",
    padding: 20,
  },
  numPadModalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    height: "100%",
    width: "100%",
  },
  numPadBtnCont: {
    width: 72,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  numPadBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  numPadBtnText: {
    fontFamily: "Rubik-ExtraBold",
    color: "#ffffff",
    fontSize: 32,
    lineHeight: 38,
  },
});
