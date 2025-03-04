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
import Create from "@components/Create";

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

  const renderItem = useCallback(
    ({ item }: { item: number }) => (
      <View style={styles.itemContainer}>
        <Image source={icons.bnb} style={styles.coinIcon} resizeMode="cover" />
        <View style={styles.coinInfo}>
          <Text style={styles.coinName}>Binance Coin</Text>
          <View style={styles.coinPriceContainer}>
            <Text style={styles.coinPrice}>$226.69</Text>
            <Text style={styles.coinChange}>+2%</Text>
          </View>
        </View>
        <Text style={styles.coinBalance}>19.2371 BNB</Text>
      </View>
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
            data={[1, 2, 3, 4]}
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
