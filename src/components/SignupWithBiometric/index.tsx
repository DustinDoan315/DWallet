import { Pressable, StyleSheet, Switch, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignWithFaceIDProps = {
  title?: string;
};

const SignWithFaceID: React.FC<SignWithFaceIDProps> = ({
  title = "Sign in with Face ID",
}) => {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);

  useEffect(() => {
    const checkFaceIDStatus = async () => {
      const storedFaceID = await AsyncStorage.getItem("faceIDEnabled");
      if (storedFaceID === "true") {
        setIsFaceIDEnabled(true);
      }
    };

    checkFaceIDStatus();
  }, []);

  const handleToggleFaceID = async () => {
    if (!isFaceIDEnabled) {
      try {
        if (true) {
        } else {
          Alert.alert(
            "Error",
            "Biometric authentication is not supported on this device."
          );
          setIsFaceIDEnabled(false);
        }
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to authenticate.");
        setIsFaceIDEnabled(false);
      }
    } else {
      setIsFaceIDEnabled(false);
      await AsyncStorage.setItem("faceIDEnabled", "false");
    }
  };

  const handleToggleSwitch = async () => {
    if (!isFaceIDEnabled) {
      await handleToggleFaceID();
    } else {
      setIsFaceIDEnabled(false);
      await AsyncStorage.setItem("faceIDEnabled", "false");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleToggleSwitch}>
        <Switch value={isFaceIDEnabled} onValueChange={handleToggleSwitch} />
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
    fontSize: 24,
    fontFamily: "Sans-Serif",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
