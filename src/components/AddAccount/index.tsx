import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { color } from "@theme/index";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const AddAccount = ({ setShowBottomSheet }: any) => {
  const { hideBottomSheet } = useBottomSheet();

  const [accounts, setAccounts] = useState([
    { id: 1, name: "Account 1", balance: "0.32 ETH", isActive: true },
    { id: 2, name: "Account 2", balance: "1.25 ETH", isActive: false },
    { id: 3, name: "Account 3", balance: "3.78 ETH", isActive: false },
  ]);

  // Handle selecting an account
  const handleSelectAccount = (id: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => ({
        ...acc,
        isActive: acc.id === id,
      }))
    );
  };

  // Create a new account
  const handleCreateAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      name: `Account ${accounts.length + 1}`,
      balance: "0.00 ETH",
      isActive: false,
    };
    setAccounts([...accounts, newAccount]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Account</Text>
      </View>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.accountItem}
            onPress={() => handleSelectAccount(item.id)}>
            {/* Avatar on the left */}
            <Image source={icons.avatar_2} style={styles.avatar} />

            {/* Account Name & Balance */}
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.balance}>{item.balance}</Text>
            </View>

            {/* Active Icon on the Right */}
            {item.isActive && (
              <Image source={icons.success} style={styles.activeIcon} />
            )}
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.importButton}>
          <Text style={styles.buttonText}>Import Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.dark,
    padding: 20,
    flex: 1,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    color: color.white,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 14,
    color: color.white,
  },
  activeIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
  createButton: {
    // backgroundColor: "#5cb85c",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  importButton: {
    // backgroundColor: "#337ab7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 30,
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

export default AddAccount;
