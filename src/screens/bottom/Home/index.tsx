import { View } from "react-native";
import React from "react";

import HeaderChain from "@components/HeaderChain";
import Balance from "@components/Balance";
import CollectionToken from "@components/CollectionToken";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const HomeScreen = () => {
  const { showBottomSheet } = useBottomSheet();

  return (
    <View style={{ flex: 1, backgroundColor: "#080A0B" }}>
      <HeaderChain />
      <Balance />
      <CollectionToken showBottomSheet={showBottomSheet} />
    </View>
  );
};

export default HomeScreen;
