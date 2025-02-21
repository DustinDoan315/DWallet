import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { icons } from "@assets/index";
import { root } from "@navigation/NavigationRef";
import { width } from "@utils/response";

type HeaderProgressBarComponent = {
  handleGoHome?: () => void;
  icon?: string;
};

const HeaderProgressBar: React.FC<HeaderProgressBarComponent> = ({ icon }) => {
  const handleGoBack = () => {
    root.goBack();
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Image style={styles.backButtonImage} source={icons.arrow_back} />
      </Pressable>

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          width: width - 12,
        }}>
        <Image resizeMode="stretch" source={icon ? icon : icons.arrow_back} />
      </View>
    </View>
  );
};

export default HeaderProgressBar;

const styles = StyleSheet.create({
  header: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  backButton: {
    zIndex: 1,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});
