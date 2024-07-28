import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProblemScreen from "../screens/ProblemScreen";
import SendProblem from "../screens/SendProblem";
import SolutionsScreen from "../screens/SolutionsScreen";
import SignInScreen from "../screens/SignInScreen";
import FriendListScreen from "../screens/Friends/FriendListScreen";
import SendRequest from "../screens/Friends/SendRequest";
import FriendRequests from "../screens/Friends/FriendRequests";
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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="FriendList" component={FriendListScreen} />
        <Stack.Screen name="SendRequest" component={SendRequest} />
        <Stack.Screen name="MessageList" component={MessageList} />
        <Stack.Screen name="FriendRequests" component={FriendRequests} />


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
        <Stack.Screen
        name="SendProblem"
        component={SendProblem}
        options={{
          animationEnabled: false, // Disable the animation
        }}
      />

        <Stack.Screen name="Solutions" component={SolutionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
