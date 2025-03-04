import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { color } from "@theme/index";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const AddToken = ({ setShowBottomSheet }: any) => {
  const { hideBottomSheet } = useBottomSheet();

  const [activityItems, setActivityItems] = useState([
    { id: 1, color: "#3e8dff", title: "Ethereum Main", isActive: true },
    { id: 2, color: "#75e268", title: "Goerli Test", isActive: false },
    { id: 3, color: "red", title: "Ropsten Test", isActive: false },
    { id: 4, color: "yellow", title: "Kovan Test", isActive: false },
  ]);

  // Handle selecting a network
  const handleSelectNetwork = (id: number) => {
    setActivityItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isActive: item.id === id, // Set selected item as active
      }))
    );
  };

  const activeItem = activityItems.find((item) => item.isActive);
  const inactiveItems = activityItems.filter((item) => !item.isActive);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Network</Text>
      </View>

      {/* Render Active Item First */}
      {activeItem && (
        <Pressable
          key={activeItem.id}
          style={styles.itemContainer}
          onPress={() => handleSelectNetwork(activeItem.id)}>
          <View
            style={[styles.networkDot, { backgroundColor: activeItem.color }]}
          />
          <Text style={styles.itemTitle}>{activeItem.title}</Text>
          <Image source={icons.success} style={styles.itemIcon} />
        </Pressable>
      )}

      {/* "Other Network" Text */}
      {inactiveItems.length > 0 && (
        <Text style={styles.otherNetworkText}>Other Network</Text>
      )}

      {/* Render Inactive Items Below */}
      {inactiveItems.map((item) => (
        <Pressable
          key={item.id}
          style={styles.itemContainer}
          onPress={() => handleSelectNetwork(item.id)}>
          <View style={[styles.networkDot, { backgroundColor: item.color }]} />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </Pressable>
      ))}

      <TouchableOpacity onPress={hideBottomSheet} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.dark,
    padding: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  networkDot: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: color.white,
    marginLeft: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 10,
  },
  otherNetworkText: {
    color: color.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  closeButton: {
    marginVertical: 30,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#d9534f",
    borderRadius: 5,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddToken;
