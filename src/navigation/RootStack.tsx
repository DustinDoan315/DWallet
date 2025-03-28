import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { navigationRef } from "./NavigationRef";
import BottomTabNavigation from "./BottomTabNavigation";
import CommonNavigation from "./CommonNavigation";
import router from "./router";
import OnboardingNavigation from "./OnboardingNavigation";
import AuthNavigation from "./AuthNavigation";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={router.BOTTOM_NAVIGATION}
          component={BottomTabNavigation}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={router.ONBOARDING_NAVIGATION}
          component={OnboardingNavigation}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={router.AUTH_NAVIGATION}
          component={AuthNavigation}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name={router.COMMON_NAVIGATION}
          component={CommonNavigation}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
