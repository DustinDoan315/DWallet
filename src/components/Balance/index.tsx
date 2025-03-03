import React, { useState, useEffect, memo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { icons } from "@assets/index";
import axios from "axios";

const DEFAULT_BALANCE = "9.2362";
const DEFAULT_USD_VALUE = "16,815.2362";
const DEFAULT_CHANGE_PERCENTAGE = "+0.7";

const Balance = () => {
  const [balance, setBalance] = useState<string>(DEFAULT_BALANCE);
  const [usdValue, setUsdValue] = useState<string>(DEFAULT_USD_VALUE);
  const [changePercentage, setChangePercentage] = useState<string>(
    DEFAULT_CHANGE_PERCENTAGE
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("https://api.example.com/balance");
        const { ethBalance, usdEquivalent, changePercent } = response.data;

        setBalance(ethBalance || DEFAULT_BALANCE);
        setUsdValue(usdEquivalent || DEFAULT_USD_VALUE);
        setChangePercentage(changePercent || DEFAULT_CHANGE_PERCENTAGE);
      } catch (err) {
        setError("Failed to fetch balance, using default values.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      {/* Balance Text */}
      <Text style={styles.balanceText}>{balance} ETH</Text>

      {/* USD Value & Change Percentage */}
      <View style={styles.usdContainer}>
        <Text style={styles.usdText}>${usdValue}</Text>
        <Text style={styles.changeText}>{changePercentage}%</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <ActionButton title="Send" icon={icons.cart} />
        <ActionButton title="Receive" icon={icons.cart} />
        <ActionButton title="Buy" icon={icons.cart} />
      </View>

      {/* Error Message (If API Failed) */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const ActionButton = ({ title, icon }: { title: string; icon: any }) => (
  <Pressable style={styles.actionButton}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default memo(Balance);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  usdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  usdText: {
    fontSize: 14,
    marginRight: 5,
    color: "white",
  },
  changeText: {
    fontSize: 12,
    color: "green",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 12,
    color: "white",
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
