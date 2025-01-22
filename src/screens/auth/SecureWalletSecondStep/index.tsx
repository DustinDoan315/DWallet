import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  AppState,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { icons } from "@assets/index";
import HeaderProgressBar from "@components/HeaderProgressBar";
import router from "@navigation/router";
import { authRoot } from "@navigation/NavigationRef";

const SecureWalletSecondStepScreen = () => {
  const [appState, setAppState] = useState<string>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  const handleStartPress = () => {
    authRoot.navigate(router.SECURE_WALLET_THIRD);
  };

  if (appState !== "active") {
    return <View style={styles.inactiveState} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderProgressBar icon={icons.progressSecond} />

      {/* Title Section */}
      <View style={styles.titleSection}>
        <View
          style={[
            styles.titleRow,
            {
              justifyContent: "center",
            },
          ]}>
          <Text style={styles.titleText}>Secure Your Wallet</Text>
          <Image
            style={{
              position: "absolute",
              right: 0,
            }}
            source={icons.information}
          />
        </View>
        <View style={styles.subTitleRow}>
          <Text style={styles.titleText}>Secure your wallet's</Text>
          <Text style={styles.highlight}> Seed phrase</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.description}>Manual</Text>
        <Text style={styles.description}>
          Write down your seed phrase on a piece of paper and store it in a safe
          place you trust.
        </Text>
        <Text style={styles.description}>Security level: Very strong</Text>
        <Image source={icons.progressLength} style={styles.progressImage} />
        <Text style={styles.description}>
          Risks include: • Losing it • Forgetting its location • Someone else
          finding it
        </Text>
        <Text style={styles.description}>
          Alternative options: Doesn't have to be paper!
        </Text>
        <Text style={styles.description}>
          Tips: • Store in a bank vault • Use a safe • Multiple secret places
        </Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <LinearGradient
          style={styles.createBtnLinear}
          colors={["#8AD4EC", "#EF96FF", "#FF56A9", "#FFAA6C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.22, 0.54, 0.85, 1]}>
          <Pressable onPress={handleStartPress} style={styles.createBtn}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SecureWalletSecondStepScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080A0B",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  inactiveState: {
    flex: 1,
    backgroundColor: "pink",
  },
  titleSection: {
    marginVertical: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  highlight: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  content: {
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#8ea0b6",
    marginVertical: 5,
  },
  progressImage: {
    marginVertical: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    paddingHorizontal: 20,
  },
  createBtnLinear: {
    borderRadius: 80,
  },
  createBtn: {
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
