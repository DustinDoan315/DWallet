import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import router from "./router";
import { onboarding } from "@screens/onboarding";

const OnboardingStack = createNativeStackNavigator();

const OnboardingNavigation = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name={router.INTRO_SCREEN}
        component={onboarding[router.INTRO_SCREEN]}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigation;
