import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";
import AddToken from "@components/AddToken";
import AddAccount from "@components/AddAccount";

const HeaderChain = () => {
  const { showBottomSheet } = useBottomSheet();

  const handleQr = () => {
    console.log("QR code pressed");
  };

  return (
    <View style={styles.container}>
      {/* Avatar & QR Code */}
      <View style={styles.avatarContainer}>
        <Image
          source={icons.avatar_2}
          resizeMode="cover"
          style={styles.avatar}
        />
        <Pressable
          onPress={() => showBottomSheet(<AddAccount />)}
          style={styles.qrButton}>
          <Image
            source={icons.qr_code}
            resizeMode="cover"
            style={styles.qrIcon}
          />
        </Pressable>
      </View>

      {/* Network Selector */}
      <View style={styles.networkContainer}>
        <Text style={styles.networkText}>Ethereum Main</Text>
        <Pressable onPress={() => showBottomSheet(<AddToken />)}>
          <Image
            source={icons.down_arrow}
            style={styles.downArrow}
            resizeMode="cover"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default memo(HeaderChain);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: {
    position: "absolute",
    left: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  qrButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 4,
  },
  qrIcon: {
    width: 16,
    height: 16,
  },
  networkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  networkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  downArrow: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },
});
