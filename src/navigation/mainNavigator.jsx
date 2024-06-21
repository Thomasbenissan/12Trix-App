import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import IDSignInScreen from "../screens/IDSignInScreen";
import UserSignInScreen from "../screens/UserSignInScreen";
import HomeScreen from "../screens/HomeScreen";
import ProblemScreen from "../screens/ProblemScreen";
import SolutionsScreen from "../screens/SolutionsScreen";
import UserSignupScreen from "../screens/UserSignupScreen";
import FriendListScreen from "../screens/FriendListScreen";
import SendRequest from "../screens/SendRequest";
import MessageList from "../screens/MessageList";

const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="IdSignIn" component={IDSignInScreen} />
        <Stack.Screen name="UserSignUp" component={UserSignupScreen} />

        <Stack.Screen name="UserSignIn" component={UserSignInScreen} />
        <Stack.Screen name="FriendList" component={FriendListScreen} />
        <Stack.Screen name="SendRequest" component={SendRequest} />
        <Stack.Screen name="MessageList" component={MessageList} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            cardStyleInterpolator:
              route.params?.animation === "leftToRight"
                ? leftToRightAnimation.cardStyleInterpolator
                : CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen name="Problem" component={ProblemScreen} />
        <Stack.Screen name="Solutions" component={SolutionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
