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
import { color } from "@theme/index";
import SentToken from "@components/SentToken";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const DEFAULT_BALANCE = "9.2362";
const DEFAULT_USD_VALUE = "16,815.2362";
const DEFAULT_CHANGE_PERCENTAGE = "+0.7";

const BalanceMainChain = () => {
  const { showBottomSheet } = useBottomSheet();

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
        const { balance, usdQuivalent, changePercent } = response.data;

        setBalance(balance || DEFAULT_BALANCE);
        setUsdValue(usdQuivalent || DEFAULT_USD_VALUE);
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

  const handleSend = () => {
    showBottomSheet(<SentToken />);
  };

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
        <ActionButton onPress={handleSend} title="Send" icon={icons.send} />
        <ActionButton title="Receive" icon={icons.received} />
        <ActionButton title="Buy" icon={icons.send} />
      </View>

      {/* Error Message (If API Failed) */}
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
    </View>
  );
};

const ActionButton = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: any;
  onPress?: any;
}) => (
  <Pressable onPress={onPress} style={styles.actionButton}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default memo(BalanceMainChain);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  usdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
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
    marginTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: color.dark_light_2,
  },
  icon: {
    width: 18,
    height: 18,
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
