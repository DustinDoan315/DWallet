import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { color } from "@theme/index";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";
import { listAccounts, listRecentAccounts } from "@utils/fake";
import LinearGradient from "react-native-linear-gradient";
import Amount from "./components/Amount";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

const SentToken = ({ setShowBottomSheet }: any) => {
  const tokenData = useSelector((state: RootState) => state.token);

  console.log("Token Data:", tokenData);

  const activeAccount = listAccounts.find((account) => account.isActive);
  const { hideBottomSheet } = useBottomSheet();
  const [isShowListAccount, setIsShowListAccount] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [account, setAccount] = useState(activeAccount);
  const [receiveAddress, setReceiveAddress] = useState<string>("");
  const [isShowAmountSheet, setIsShowAmountSheet] = useState<boolean>(false);

  const handleSelectAccount = useCallback((newAccount: any) => {
    setAccount(newAccount);
    setIsShowListAccount(false);
  }, []);

  const handleSelectRecent = useCallback((item: any) => {
    setReceiveAddress(item.address);
    setIsSend(true);
  }, []);

  const handleNextPress = () => {
    setIsSend(true);
    setIsShowAmountSheet(true);
  };

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
        {isSend && (
          <Pressable
            onPress={() => {
              setIsSend(false);
              setIsShowAmountSheet(false);
              setReceiveAddress("");
            }}
            style={styles.backButton}>
            <Image source={icons.arrow_back} />
          </Pressable>
        )}
        <Text style={styles.headerTitle}>
          {isShowListAccount
            ? "Select Account"
            : isShowAmountSheet
            ? "Amount"
            : "Send Token"}
        </Text>
      </View>

      {isShowListAccount ? (
        <FlatList
          data={listAccounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAccountItem}
        />
      ) : isShowAmountSheet ? (
        <Amount
          setIsSend={setIsSend}
          setIsShowAmountSheet={setIsShowAmountSheet}
        />
      ) : (
        <>
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

          {/* Amount Container */}
          <View style={styles.amountContainer}>
            <View>
              <View style={styles.rowStyle}>
                <Text style={styles.boldText}>Amount</Text>
                <Text
                  style={
                    styles.boldText
                  }>{`${tokenData.tokenValue} ${tokenData.tokenType}`}</Text>
              </View>

              <View style={styles.fee}>
                <Text style={styles.boldText}>Network fee</Text>
                <Text
                  style={styles.boldText}>{`0.12 ${tokenData.tokenType}`}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowStyle}>
              <Text style={styles.boldText}>Total Amount</Text>
              <View style={styles.alignRight}>
                <Text
                  style={
                    styles.boldText
                  }>{`${tokenData.tokenValue} ${tokenData.tokenType}`}</Text>
                <Text
                  style={
                    styles.secondaryText
                  }>{`$${tokenData.tokenValue}`}</Text>
              </View>
            </View>
          </View>

          {/* Receive Address Input */}
          <Text style={styles.sectionTitle}>To</Text>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: receiveAddress ? 100 : 0,
              },
            ]}
            placeholder="Enter or select an address"
            placeholderTextColor="#888"
            value={receiveAddress}
            onChangeText={(text: string) => setReceiveAddress(text)}
          />

          {receiveAddress.length > 0 ? (
            <View style={styles.buttonContainer}>
              <LinearGradient
                style={styles.createBtnLinear}
                colors={["#8AD4EC", "#EF96FF", "#FF56A9", "#FFAA6C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.22, 0.54, 0.85, 1]}>
                <Pressable onPress={handleNextPress} style={styles.createBtn}>
                  <Text style={styles.buttonText}>Next</Text>
                </Pressable>
              </LinearGradient>
            </View>
          ) : (
            <>
              <View style={styles.divider} />
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
            </>
          )}
        </>
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
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  amountContainer: {
    marginVertical: 20,
    backgroundColor: color.dark_light_2,
    padding: 20,
    borderRadius: 10,
  },
  label: {
    color: color.secondText,
  },
  boldText: {
    color: color.white,
    marginVertical: 5,
    fontWeight: "bold",
  },
  secondaryText: {
    color: color.secondText,
    marginTop: 5,
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
  backButton: {
    position: "absolute",
    left: 0,
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
  fee: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: 15,
    height: 2,
    width: "100%",
    backgroundColor: "#444",
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
  buttonContainer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    paddingHorizontal: 20,
    alignSelf: "center",
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

export default SentToken;
