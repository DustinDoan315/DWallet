import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

interface BottomSheetProps {
  setShowBottomSheet: (visible: boolean) => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  setShowBottomSheet,
  children,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

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

        <View
          style={[styles.content, { bottom: keyboardVisible ? 290 : 0 }]}
          onStartShouldSetResponder={() => true}>
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
    width: "100%",
    borderRadius: 10,
    zIndex: 10,
  },
});
