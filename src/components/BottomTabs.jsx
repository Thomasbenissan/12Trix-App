import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SettingsMenu from "../screens/SettingsMenu";

import {
  HomeIcon,
  BellIcon,
  StarIcon,
  UsersIcon,
  MailIcon,
  SettingsIcon,
} from "./Icons";

export const BottomTabs = ({ navigation }) => {
  const mainMenuTranslation = useRef(new Animated.Value(0)).current;

  const onMainMenuOpenTranslation = () => {
    Animated.timing(mainMenuTranslation, {
      toValue: 100,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const onMainMenuCloseTranslation = () => {
    Animated.timing(mainMenuTranslation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <LinearGradient colors={["#F37735", "#F33535"]} style={styles.bottomTabs}>
        <TouchableOpacity
          style={styles.bottomTabsBtn}
          onPress={() => navigation.push("Home", { animation: "leftToRight" })}
        >
          <HomeIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTabsBtn}>
          <BellIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTabsBtn}>
          <StarIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTabsBtn}
          onPress={() =>
            navigation.push("FriendList", { animation: "leftToRight" })
          }
        >
          <UsersIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTabsBtn}>
          <MailIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTabsBtn}
          onPress={onMainMenuOpenTranslation}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </LinearGradient>

      <Animated.View
        style={[
          styles.mainMenu,
          {
            transform: [
              {
                translateX: mainMenuTranslation.interpolate({
                  inputRange: [0, 100],
                  outputRange: [360, 2],
                }),
              },
            ],
          },
        ]}
      >
        <SettingsMenu onClosePress={onMainMenuCloseTranslation} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    height: 72,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
  bottomTabsBtn: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  mainMenu: {
    width: 355,
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 170,
    transform: [{ translateX: 360 }],
  },
});
