import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import router from "./router";
import { auth } from "@screens/auth";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={router.IMPORT_WALLET}
        component={auth[router.IMPORT_WALLET]}
      />
      <AuthStack.Screen
        name={router.CREATE_NEW_WALLET}
        component={auth[router.CREATE_NEW_WALLET]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET}
        component={auth[router.SECURE_WALLET]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_SECOND}
        component={auth[router.SECURE_WALLET_SECOND]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_THIRD}
        component={auth[router.SECURE_WALLET_THIRD]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_FINAL}
        component={auth[router.SECURE_WALLET_FINAL]}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
