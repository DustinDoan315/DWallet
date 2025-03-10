import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "@assets/index";
import { color } from "@theme/index";
import { bottomRoot, commonRoot } from "@navigation/NavigationRef";
import router from "@navigation/router";

const Header = ({ handleGoHome, title = "" }: any) => {
  const goHome = () => {
    bottomRoot.navigate(router.HOME_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoHome || goHome}>
        <Image
          source={icons.arrow_back}
          resizeMode="contain"
          style={styles.icon}
        />
      </Pressable>

      <View
        style={{
          position: "absolute",
          width: "100%",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: color.white,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 86,
    height: 25,
  },
});
