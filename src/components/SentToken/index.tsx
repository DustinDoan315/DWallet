import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { color } from "@theme/index";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";
import { listAccounts, listRecentAccounts } from "@utils/fake";

const SentToken = ({ setShowBottomSheet }: any) => {
  const activeAccount = listAccounts.find((account) => account.isActive);
  const { hideBottomSheet } = useBottomSheet();
  const [isShowListAccount, setIsShowListAccount] = useState(false);
  const [account, setAccount] = useState(activeAccount);
  const [receiveAddress, setReceiveAddress] = useState("");

  const handleSelectAccount = useCallback((newAccount: any) => {
    setAccount(newAccount);
    setIsShowListAccount(false);
  }, []);

  const handleSelectRecent = useCallback((item: any) => {
    setReceiveAddress(item.address);
  }, []);

  const renderAccountItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        style={styles.accountItem}
        onPress={() => handleSelectAccount(item)}>
        <Image source={icons.avatar_2} style={styles.avatar} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{item.name}</Text>
          <Text style={styles.balance}>{item.balance}</Text>
        </View>
        {item.isActive && (
          <Image source={icons.success} style={styles.activeIcon} />
        )}
      </TouchableOpacity>
    ),
    [handleSelectAccount]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isShowListAccount ? "Select Account" : "Send Token"}
        </Text>
      </View>

      {isShowListAccount ? (
        <FlatList
          data={listAccounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAccountItem}
        />
      ) : (
        <View>
          {/* Main Account Section */}
          <Text style={styles.sectionTitle}>From</Text>
          <TouchableOpacity
            style={styles.mainAccount}
            onPress={() => setIsShowListAccount(true)}>
            <Image source={icons.avatar_2} style={styles.avatarLarge} />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account?.name}</Text>
              <Text style={styles.balance}>{account?.balance}</Text>
            </View>
            <Image source={icons.arrow_back} style={styles.arrowBack} />
          </TouchableOpacity>

          {/* Receive Address Input */}
          <Text style={styles.sectionTitle}>To</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter or select an address"
            placeholderTextColor="#888"
            value={receiveAddress}
            onChangeText={setReceiveAddress}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Recently Received Tokens */}
          <Text style={styles.sectionTitle}>Recently Received Tokens</Text>
          {listRecentAccounts.length > 0 ? (
            <FlatList
              data={listRecentAccounts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.accountItem}
                  onPress={() => handleSelectRecent(item)}>
                  <Image source={icons.avatar_2} style={styles.avatar} />
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.addressText}>{item.address}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noRecent}>No recent transactions</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.white,
    marginBottom: 10,
    marginTop: 10,
  },
  mainAccount: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
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
  avatarLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  arrowBack: {
    width: 20,
    height: 20,
    borderRadius: 20,
    transform: [{ rotate: "180deg" }],
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
  addressText: {
    fontSize: 12,
    color: "#bbb",
  },
  activeIcon: {
    width: 24,
    height: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 15,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: color.white,
    backgroundColor: "#2a2a2a",
  },
  noRecent: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});

export default SentToken;
