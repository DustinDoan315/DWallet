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
        name={router.SECURE_WALLET_INFO}
        component={auth[router.SECURE_WALLET_INFO]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_GEN}
        component={auth[router.SECURE_WALLET_GEN]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_VALID}
        component={auth[router.SECURE_WALLET_VALID]}
      />
      <AuthStack.Screen
        name={router.SECURE_WALLET_SUCCESS}
        component={auth[router.SECURE_WALLET_SUCCESS]}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
