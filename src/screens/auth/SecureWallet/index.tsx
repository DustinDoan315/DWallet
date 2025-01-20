import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { width } from "@utils/response";
import LinearGradient from "react-native-linear-gradient";
import { icons } from "@assets/index";

const SecureWalletScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSeedPhrasePress = () => {
    Alert.alert("Seed Phrase", "This is your Seed Phrase. Keep it safe!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <Image style={styles.backButtonImage} source={icons.arrow_back} />
        </Pressable>
        {/* <Image
          style={styles.progressBar}
          source={require("@/assets/icons/progressSecond.png")}
        /> */}
      </View>

      <View style={styles.content}>
        <Image
          source={icons.shield}
          style={styles.shieldImage}
          resizeMode="contain"
        />

        <View style={styles.textContent}>
          <Text style={styles.title}>Secure Your Wallet</Text>
          <Text style={styles.description}>
            Don't risk losing your funds. Protect your wallet by saving your
            <Text style={styles.highlight} onPress={handleSeedPhrasePress}>
              {` Seed phrase `}
            </Text>
            in a place you trust.
          </Text>
          <Text style={styles.description}>
            It's the only way to recover your wallet if you get locked out of
            the app or get a new device.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.remindMeButton}>
          <Text style={styles.remindMeText}>Remind Me Later</Text>
        </Pressable>
        <LinearGradient
          style={styles.createBtnLinear}
          colors={["#8AD4EC", "#EF96FF", "#FF56A9", "#FFAA6C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.22, 0.54, 0.85, 1]}>
          <Pressable onPress={() => {}} style={styles.createBtn}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SecureWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080A0B",
    paddingVertical: 10,
  },
  header: {
    width: width,
    flexDirection: "row",
  },
  backButton: {
    marginTop: 12,
    marginLeft: 12,
  },
  backButtonImage: {
    width: 56,
    height: 56,
  },
  progressBar: {
    width: "65%",
    height: 56,
    marginTop: 12,
    marginLeft: 12,
  },
  content: {
    width: "100%",
    alignItems: "center",
    marginTop: 35,
  },
  shieldImage: {
    width: "80%",
    height: 295,
  },
  textContent: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#8ea0b6",
    textAlign: "center",
    marginBottom: 5,
  },
  highlight: {
    color: "#4A90E2",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    paddingHorizontal: 20,
  },
  remindMeButton: {
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  remindMeText: {
    color: "#4A90E2",
    fontSize: 18,
    fontWeight: "bold",
  },
  createBtnLinear: {
    borderRadius: 80,
    marginVertical: 10,
  },
  createBtn: {
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
