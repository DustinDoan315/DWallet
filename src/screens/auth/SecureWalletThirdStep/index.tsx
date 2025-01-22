import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  AppState,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { width } from "@utils/response";
import LinearGradient from "react-native-linear-gradient";
import { icons } from "@assets/index";
import { generateSeedPhrase } from "@utils/helper";
import HeaderProgressBar from "@components/HeaderProgressBar";

const SecureWalletThirdStepScreen = () => {
  const navigation = useNavigation();
  const [appState, setAppState] = useState<string>("active");
  const [seedPhases, setSeedPhases] = useState<string[]>([]);
  const [isBlurred, setIsBlurred] = useState<boolean>(true); // Toggle blur state

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        setAppState(nextAppState);
      }
    );

    handleSeedPhrasePress();

    return () => {
      appStateListener.remove();
    };
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSeedPhrasePress = async () => {
    const seedPhrase = await generateSeedPhrase();

    if (seedPhrase) {
      console.log("Your seed phrase:", seedPhrase.split(" "));
      setSeedPhases(seedPhrase.split(" "));
    }
  };

  const handleStartPress = () => {
    Alert.alert("Start", "You can begin the secure wallet process.");
  };

  const toggleBlur = () => {
    setIsBlurred(!isBlurred); // Toggle blur state
  };

  const _renderSeedPhrases = ({ item, index }: any) => {
    return (
      <View style={styles.seedPhraseContainer} key={index}>
        <Text style={styles.seedPhraseText}>{`${index + 1}. ${item}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.flexContainer}>
      {appState !== "active" ? (
        <View style={styles.inactiveAppState} />
      ) : (
        <View style={styles.container}>
          {/* Header Section */}
          <HeaderProgressBar icon={icons.progressSecond} />

          {/* Content Section */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.textContent}>
              <Text style={styles.title}>Write Down Your Seed Phrase</Text>
              <Text style={styles.description}>
                This is your seed phrase. Write it down on a paper and keep it
                in a safe place. You'll be asked to re-enter this phrase (in
                order) on the next step.
              </Text>
            </View>

            {/* Seed Phrase Columns */}
            <View style={styles.seedPhraseColumns}>
              {/* Left Column (Items 1-6) */}
              <View style={styles.column}>
                <FlatList
                  data={seedPhases.slice(0, 6)}
                  renderItem={_renderSeedPhrases}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                />
              </View>

              {/* Right Column (Items 7-12) */}
              <View style={styles.column}>
                <FlatList
                  data={seedPhases.slice(6, 12)}
                  renderItem={_renderSeedPhrases}
                  keyExtractor={(item, index) => (index + 6).toString()}
                  scrollEnabled={false}
                />
              </View>
            </View>

            {/* Custom Blur Overlay */}
            {isBlurred && (
              <Pressable onPress={toggleBlur} style={styles.blurOverlay}>
                <ImageBackground
                  source={icons.avatar_2}
                  style={styles.blurBackground}
                  blurRadius={10}>
                  <View style={styles.blurContent}>
                    <Image
                      source={icons.eyeVisibleBlue}
                      style={styles.blurIcon}
                    />
                    <Text style={styles.blurText}>Tap to reveal</Text>
                  </View>
                </ImageBackground>
              </Pressable>
            )}
          </ScrollView>

          {/* Button Section */}
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
              <Pressable onPress={handleStartPress} style={styles.createBtn}>
                <Text style={styles.buttonText}>Start</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
};

export default SecureWalletThirdStepScreen;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  inactiveAppState: {
    flex: 1,
    backgroundColor: "pink",
  },
  container: {
    flex: 1,
    backgroundColor: "#080A0B",
    paddingVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Add padding to avoid button overlap
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
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#8ea0b6",
    textAlign: "center",
    marginBottom: 20,
  },
  seedPhraseColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between columns
  },
  seedPhraseContainer: {
    backgroundColor: "#202832",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  seedPhraseText: {
    color: "#ffffff",
    fontSize: 16,
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
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  blurBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContent: {
    alignItems: "center",
  },
  blurIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  blurText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
