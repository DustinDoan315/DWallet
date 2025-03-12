import { icons } from "@assets/index";
import { BlurView } from "@react-native-community/blur";
import { setToken } from "@redux/token/tokenSlice";
import { color } from "@theme/index";
import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";

// Static Tokens List (to avoid unnecessary re-creation)
const TOKENS = [
  { name: "BNB", amount: 2.5, value: "$600" },
  { name: "ETH", amount: 1.2, value: "$2200" },
  { name: "USDT", amount: 500, value: "$500" },
] as const;

const Amount = ({ setIsShowAmountSheet, setIsSend }: any) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedToken = useMemo(() => TOKENS[selectedIndex], [selectedIndex]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const selectToken = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsDropdownOpen(false);
  }, []);

  const handleNextPress = () => {
    if (selectedToken.name && amount) {
      dispatch(setToken({ tokenType: selectedToken.name, tokenValue: amount }));
      setIsShowAmountSheet(false);
      setIsSend(false);
    }
  };

  const renderTokenItem = useCallback(
    ({ item, index }: { item: (typeof TOKENS)[number]; index: number }) => (
      <TouchableOpacity
        style={[
          styles.tokenItem,
          index === selectedIndex && styles.selectedToken,
        ]}
        onPress={() => selectToken(index)}>
        <Text style={styles.tokenName}>{item.name}</Text>
        <View style={styles.tokenAmountContainer}>
          <Text style={styles.tokenAmount}>{item.amount}</Text>
          <Text style={styles.tokenValue}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    ),
    [selectedIndex]
  );

  return (
    <View style={styles.container}>
      {/* Token Dropdown */}
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.tokenTitle}>{selectedToken.name}</Text>
        <Image
          source={icons.down_arrow}
          style={[styles.icon, isDropdownOpen && styles.iconRotated]}
        />
      </TouchableOpacity>

      {/* Token List Modal */}
      <Modal
        transparent
        visible={isDropdownOpen}
        animationType="fade"
        onRequestClose={toggleDropdown}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleDropdown}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={10}
          />
          <View style={styles.tokenListContainer}>
            <Text style={styles.tokenHeader}>Select Token</Text>
            <FlatList
              data={TOKENS}
              keyExtractor={(item) => item.name}
              renderItem={renderTokenItem}
              extraData={selectedIndex}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Balance Display */}
      <Text style={styles.balance}>
        Balance: {selectedToken.amount} {selectedToken.name}
      </Text>

      {/* Next Button */}
      {amount && (
        <View style={styles.buttonContainer}>
          <LinearGradient
            style={styles.createBtnLinear}
            colors={["#8AD4EC", "#EF96FF", "#FF56A9", "#FFAA6C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Pressable onPress={handleNextPress} style={styles.createBtn}>
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 12,
  },
  tokenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  iconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tokenListContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: color.dark,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tokenHeader: {
    marginVertical: 20,
    fontSize: 16,
    color: color.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  tokenItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  selectedToken: {
    backgroundColor: "#555",
    borderRadius: 8,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  tokenAmountContainer: {
    alignItems: "flex-end",
  },
  tokenAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tokenValue: {
    fontSize: 12,
    color: "#bbb",
  },
  input: {
    width: "100%",
    fontSize: 18,
    paddingVertical: 10,
    marginTop: 16,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  balance: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 50,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  createBtnLinear: {
    borderRadius: 80,
    width: "100%",
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
