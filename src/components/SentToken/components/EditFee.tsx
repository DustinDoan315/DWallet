import { icons } from "@assets/index";
import { BlurView } from "@react-native-community/blur";
import { setToken } from "@redux/token/tokenSlice";
import { color } from "@theme/index";
import { width } from "@utils/response";
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
const NETWORK_FEE = [
  { type: "Slow", amount: 0.08, value: "$19.683" },
  { type: "Average", amount: 0.12, value: "$29.588" },
  { type: "Fast", amount: 0.13, value: "$32.051" },
] as const;

const tabItems = ["Basic", "Advanced"] as const;

const EditFee = ({ setIsShowAmountSheet, setIsSend }: any) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [amount, setAmount] = useState("");
  const [activePage, setActivePage] =
    useState<(typeof tabItems)[number]>("Basic");

  const handleSwitchPage = useCallback((page: "Basic" | "Advanced") => {
    setActivePage(page);
  }, []);

  const selectedFeeType = useMemo(
    () => NETWORK_FEE[selectedIndex],
    [selectedIndex]
  );

  const selectNetworkFee = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleNextPress = () => {
    if (selectedFeeType.type && amount) {
      dispatch(
        setToken({ tokenType: selectedFeeType.type, tokenValue: amount })
      );
      setIsShowAmountSheet(false);
      setIsSend(false);
    }
  };

  const renderTokenItem = useCallback(
    ({
      item,
      index,
    }: {
      item: (typeof NETWORK_FEE)[number];
      index: number;
    }) => (
      <TouchableOpacity
        style={[
          styles.tokenItem,
          index === selectedIndex && styles.selectedFeeType,
        ]}
        onPress={() => selectNetworkFee(index)}>
        <Text style={styles.tokenName}>{item.type}</Text>
        <View style={styles.tokenAmountContainer}>
          <Text style={styles.tokenAmount}>{`${item.amount} ${"BNB"}`}</Text>
          <Text style={styles.tokenValue}>{item.value}</Text>
        </View>

        {index === selectedIndex && (
          <View
            style={{
              position: "absolute",
              right: 12,
            }}>
            <Image
              source={icons.success}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        )}
      </TouchableOpacity>
    ),
    [selectedIndex]
  );

  return (
    <View style={styles.container}>
      {/* Token Dropdown */}

      <View style={styles.tokenListContainer}>
        <View style={styles.tabContainer}>
          {tabItems.map((page) => (
            <Pressable
              key={page}
              onPress={() => handleSwitchPage(page)}
              style={styles.tabButton}>
              <Text
                style={[
                  styles.tabText,
                  activePage === page && styles.activeTabText,
                ]}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Text>
              {activePage === page && <View style={styles.activeIndicator} />}
            </Pressable>
          ))}
        </View>

        <FlatList
          data={NETWORK_FEE}
          keyExtractor={(item) => item.type}
          renderItem={renderTokenItem}
          extraData={selectedIndex}
        />
      </View>

      {/* Next Button */}
      {
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
      }
    </View>
  );
};

export default EditFee;

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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 18,
    color: "#666",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  activeIndicator: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
    marginTop: 5,
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
    width: "100%",
    paddingTop: 10,
    paddingBottom: 100,
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
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  selectedFeeType: {
    backgroundColor: "#555",
    borderRadius: 8,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  tokenAmountContainer: {
    position: "absolute",
    left: width / 3,
  },
  tokenAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 3,
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
    marginVertical: 10,
    borderWidth: 1,
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
