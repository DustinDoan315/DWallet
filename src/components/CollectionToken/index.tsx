import React, { useState, useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { icons } from "@assets/index";
import { commonRoot } from "@navigation/NavigationRef";
import router from "@navigation/router";
import { FakeListAssets } from "@utils/fake";

const tabItems = ["token", "collectibles"] as const;

interface Props {
  showBottomSheet: (content: React.ReactNode) => void;
}

const CollectionToken: React.FC<Props> = ({ showBottomSheet }) => {
  const [activePage, setActivePage] =
    useState<(typeof tabItems)[number]>("token");

  const handleSwitchPage = useCallback((page: "token" | "collectibles") => {
    setActivePage(page);
  }, []);

  const moveTransactionHistoryScreen = (item: any) => {
    console.log("---", item);

    commonRoot.navigate(router.TRANSACTION_HISTORY, { item: item });
  };

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Pressable
        onPress={() => moveTransactionHistoryScreen(item)}
        style={styles.itemContainer}>
        <Image source={item.img} style={styles.coinIcon} resizeMode="cover" />
        <View style={styles.coinInfo}>
          <Text style={styles.coinName}>{item.name}</Text>
          <View style={styles.coinPriceContainer}>
            <Text style={styles.coinPrice}>${item.price}</Text>
            <Text
              style={[
                styles.coinChange,
                { color: item.profit > 0 ? "green" : "red" },
              ]}>
              {`${item?.profit > 0 ? `+${item.profit}` : `${item.profit}`}%`}
            </Text>
          </View>
        </View>
        <Text style={styles.coinBalance}>
          {`${item.balance} ${item.token}`}{" "}
        </Text>
      </Pressable>
    ),
    []
  );

  return (
    <View style={styles.container}>
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

      <View style={styles.contentContainer}>
        {activePage === "token" ? (
          <FlatList
            data={FakeListAssets}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
              <Pressable
                // onPress={() => showBottomSheet(<Create />)}
                style={styles.addTokenContainer}>
                <Image source={icons.create} style={styles.addTokenIcon} />
                <Text style={styles.addTokenText}>Add Tokens</Text>
              </Pressable>
            )}
          />
        ) : (
          <Text style={styles.collectiblesText}>Collectibles Page</Text>
        )}
      </View>
    </View>
  );
};

export default CollectionToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 16,
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
  contentContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  coinIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  coinPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  coinPrice: {
    fontSize: 14,
    marginRight: 5,
    color: "white",
  },
  coinChange: {
    fontSize: 14,
    color: "green",
  },
  coinBalance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  collectiblesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
  addTokenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  addTokenIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  addTokenText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
