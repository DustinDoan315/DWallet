import React, { useState, useEffect, memo, useCallback } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";
import { icons } from "@assets/index";
import { color } from "@theme/index";
import { mockTransactions } from "@utils/fake";
import BottomSheet from "@components/BottomSheet";
import { useBottomSheet } from "@navigation/BottomSheetProvider";
import TransactionDetail from "@components/TransactionDetail";

const DEFAULT_BALANCE = "9.2362";
const DEFAULT_USD_VALUE = "16,815.2362";
const DEFAULT_CHANGE_PERCENTAGE = +0.7;

interface BalanceDetailProps {
  data?: {
    token?: string;
    balance?: number;
    profit?: number;
    price?: number;
  };
}

const BalanceDetail: React.FC<BalanceDetailProps> = ({ data }) => {
const { showBottomSheet } = useBottomSheet();

  const [balance, setBalance] = useState<string | number>(DEFAULT_BALANCE);
  const [usdValue, setUsdValue] = useState<string | number>(DEFAULT_USD_VALUE);
  const [changePercentage, setChangePercentage] = useState<number>(
    DEFAULT_CHANGE_PERCENTAGE
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);

        const response = await axios.get("https://api.example.com/balance");
        const { balance, profit, price } = response.data ?? data ?? {};
        const usdValue =
          isNaN(parseFloat(balance)) || isNaN(parseFloat(price))
            ? DEFAULT_USD_VALUE
            : (parseFloat(balance) * parseFloat(price)).toFixed(3);

        setBalance(balance ?? DEFAULT_BALANCE);
        setUsdValue(usdValue);
        setChangePercentage(profit ?? DEFAULT_CHANGE_PERCENTAGE);
      } catch {
        setError("Failed to fetch balance, using default values.");
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchBalance();
    } else {
      setBalance(data.balance ?? DEFAULT_BALANCE);
      setUsdValue(
        data.balance && data.price
          ? Number(data.balance * data.price).toFixed(3)
          : DEFAULT_USD_VALUE
      );
      setChangePercentage(data.profit ?? DEFAULT_CHANGE_PERCENTAGE);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      {/* Balance Text */}
      <Text style={styles.balanceText}>
        {balance} {data?.token}
      </Text>

      {/* USD Value & Change Percentage */}
      <View style={styles.usdContainer}>
        <Text style={styles.usdText}>${usdValue}</Text>
        <Text
          style={[
            styles.changeText,
            { color: changePercentage >= 0 ? "green" : "red" },
          ]}>
          {changePercentage}%
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <MemoizedActionButton title="Send" icon={icons.send} />
        <MemoizedActionButton title="Receive" icon={icons.send} />
      </View>

      <View style={{ width: "100%" }}>
      <FlatList
      data={mockTransactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => showBottomSheet(<TransactionDetail data={item} />)} style={styles.transactionContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <View style={styles.transactionRow}>
            {/* Left Side - Icon and Status */}
            <Image source={icons.send} style={styles.icon} />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionType}>{`${item.type} ${item.token}`}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === "Confirmed" ? "green" : "red" },
                ]}
              >
                {item.status}
              </Text>
            </View>
            {/* Right Side - Amount and Value */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{`${item.amount} ${item.token}`}</Text>
              <Text style={styles.valueText}>{`$ ${item.value.toFixed(3)}`}</Text>
            </View>
          </View>
        </Pressable>
      )}
    />
      </View>
    </View>
  );
};

const ActionButton: React.FC<{ title: string; icon: any }> = ({
  title,
  icon,
}) => (
  <Pressable style={styles.actionButton}>
    <Image source={icon} style={styles.icon_1} />
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const MemoizedActionButton = memo(ActionButton);

export default memo(BalanceDetail);

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
    fontWeight: "bold",
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
  transactionContainer: {
    padding: 16,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon_1: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  valueText: {
    fontSize: 12,
    color: "#888",
  },
});
