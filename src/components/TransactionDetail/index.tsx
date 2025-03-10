import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { color } from "@theme/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const SentTransactionDetails = ({ subAmount, fee, token }: any) => (
  <View>
    <View style={styles.rowStyle}>
      <Text style={styles.boldText}>Amount</Text>
      <Text style={styles.boldText}>{`${subAmount} ${token}`}</Text>
    </View>

    <View style={styles.divider}>
      <Text style={styles.boldText}>Fee</Text>
      <Text style={styles.boldText}>{`${fee} ${token}`}</Text>
    </View>
  </View>
);

const TransactionDetail = ({ data }: any) => {
  const { hideBottomSheet } = useBottomSheet();

  const {
    type,
    token,
    status,
    date,
    addressFrom,
    addressTo,
    amount,
    value,
    subAmount,
    fee,
  } = data;

  const statusColor = useMemo(
    () => (status === "Confirmed" ? color.green : color.crimson),
    [status]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{`${type} ${token}`}</Text>
      </View>

      <View style={styles.rowStyle}>
        <View>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.boldText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
        <View style={styles.alignRight}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.boldText}>{date}</Text>
        </View>
      </View>

      <View style={[styles.rowStyle, styles.marginVertical]}>
        <View>
          <Text style={styles.label}>From</Text>
          <Text style={styles.boldText}>{addressFrom}</Text>
        </View>
        <View style={styles.alignRight}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.boldText}>{addressTo}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        {type === "Sent" && (
          <SentTransactionDetails
            subAmount={subAmount}
            fee={fee}
            token={token}
          />
        )}

        <View style={styles.rowStyle}>
          <Text style={styles.boldText}>Total Amount</Text>
          <View style={styles.alignRight}>
            <Text style={styles.boldText}>{`${amount} ${token}`}</Text>
            <Text style={styles.secondaryText}>{`$${value}`}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.viewButton}>
        <Text style={styles.viewText}>View on Mainnet</Text>
      </Pressable>
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
    justifyContent: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignRight: {
    alignItems: "flex-end",
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
  marginVertical: {
    marginVertical: 20,
  },
  amountContainer: {
    marginVertical: 20,
    backgroundColor: color.dark_light_2,
    padding: 20,
    borderRadius: 10,
  },
  divider: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.primaryBorder,
  },
  viewButton: {
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  viewText: {
    color: color.blue_1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TransactionDetail;
