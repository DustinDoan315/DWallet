import { Pressable, StyleSheet, Switch, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

type SignWithFaceIDProps = {
  title?: string;
};

const SignWithFaceID: React.FC<SignWithFaceIDProps> = ({
  title = "Sign in with Face ID",
}) => {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    const loadBiometricPreference = async () => {
      const enabled = await AsyncStorage.getItem("biometricEnabled");
      setIsBiometricEnabled(enabled === "true");
    };

    loadBiometricPreference();
  }, []);

  const handleBiometricAuth = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: "Authenticate to continue",
      });

      if (success) {
        Alert.alert("Success", "Biometric authentication successful");
        return true;
      } else {
        Alert.alert(
          "Authentication Failed",
          "Biometric authentication was not successful"
        );
        return false;
      }
    } catch (error) {
      console.error("[handleBiometricAuth] Error:", error);
      Alert.alert(
        "Error",
        "An error occurred during biometric authentication."
      );
      return false;
    }
  };

  const toggleBiometricSwitch = async () => {
    const currentStatus = !isBiometricEnabled;

    if (currentStatus) {
      // Enable biometrics
      const isAuthenticated = await handleBiometricAuth();
      if (isAuthenticated) {
        setIsBiometricEnabled(true);
        await AsyncStorage.setItem("biometricEnabled", "true");
        Alert.alert("Enabled", "Biometric authentication has been enabled.");
      }
    } else {
      // Disable biometrics
      setIsBiometricEnabled(false);
      await AsyncStorage.setItem("biometricEnabled", "false");
      Alert.alert("Disabled", "Biometric authentication has been disabled.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={toggleBiometricSwitch}>
        <Switch
          value={isBiometricEnabled}
          onValueChange={toggleBiometricSwitch}
        />
      </Pressable>
    </View>
  );
};

export default SignWithFaceID;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Sans-Serif",
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
});
