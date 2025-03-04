import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

interface BottomSheetProps {
  setShowBottomSheet: (visible: boolean) => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  setShowBottomSheet,
  children,
}) => {
  return (
    <Modal transparent visible={!!children} animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setShowBottomSheet(false)}>
        {/* Blur Effect */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
        />

        <View style={styles.content} onStartShouldSetResponder={() => true}>
          {React.isValidElement(children) ? (
            children
          ) : (
            <Text>{String(children)}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 10,
    zIndex: 10,
  },
});
