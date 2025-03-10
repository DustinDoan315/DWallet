import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@components/Header";
import { color } from "@theme/index";
import BalanceDetail from "@components/BalanceDetail";

const TransactionHistoryScreen = ({ route }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: color.dark }}>
      <Header title={route.params.item.token} />

      <BalanceDetail data={route.params.item} />
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({});
