import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { color } from "@theme/index";
import { icons } from "@assets/index";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

const AddAccount = ({ setShowBottomSheet }: any) => {
  const { hideBottomSheet } = useBottomSheet();
  const [isCreating, setIsCreating] = useState(false);
  const [newAccountName, setNewAccountName] = useState("New Account");
  const [isImporting, setIsImporting] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Account 1", balance: "0.32 ETH", isActive: true },
    { id: 2, name: "Account 2", balance: "1.25 ETH", isActive: false },
    { id: 3, name: "Account 3", balance: "3.78 ETH", isActive: false },
  ]);

  const handleSelectAccount = useCallback((id: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === id ? { ...acc, isActive: true } : { ...acc, isActive: false }
      )
    );
  }, []);

  const handleCreateAccount = useCallback(() => {
    if (!newAccountName.trim()) return;

    setAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        id: prevAccounts.length + 1,
        name: newAccountName,
        balance: "0.00 ETH",
        isActive: false,
      },
    ]);
    setIsCreating(false);
    setNewAccountName("New Account");
  }, [newAccountName]);

  const renderAccountItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        style={styles.accountItem}
        onPress={() => handleSelectAccount(item.id)}>
        <Image source={icons.avatar_2} style={styles.avatar} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{item.name}</Text>
          <Text style={styles.balance}>{item.balance}</Text>
        </View>
        {item.isActive && (
          <Image source={icons.success} style={styles.activeIcon} />
        )}
      </TouchableOpacity>
    ),
    [handleSelectAccount]
  );

  const handleImportAccount = () => {
    if (!privateKey.trim()) return;
    const newImportedAccount = {
      id: accounts.length + 1,
      name: `Imported Account ${accounts.length + 1}`,
      balance: "0.00 ETH",
      isActive: false,
    };
    setAccounts([...accounts, newImportedAccount]);
    setIsImporting(false);
    setPrivateKey("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {(isCreating || isImporting) && (
          <Pressable
            onPress={() => {
              setIsCreating(false);
              setIsImporting(false);
              setNewAccountName("New Account");
            }}
            style={styles.backButton}>
            <Image source={icons.arrow_back} />
          </Pressable>
        )}
        <Text style={styles.headerTitle}>
          {isCreating
            ? "Create New Account"
            : isImporting
            ? "Import Account"
            : "Select Account"}
        </Text>
      </View>

      {isCreating ? (
        <View style={styles.createContainer}>
          <Image source={icons.avatar_2} style={styles.avatarLarge} />
          <TouchableOpacity style={styles.chooseIconButton}>
            <Text style={styles.buttonText}>Choose an Icon</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Account Name:</Text>
          <TextInput
            style={styles.input}
            value={newAccountName}
            onChangeText={setNewAccountName}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      ) : isImporting ? (
        <View style={styles.modalContainer}>
          <Text style={styles.modalDescription}>
            Imported accounts are viewable in your wallet but are not
            recoverable with your seed phrase.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Paste your private key string"
            placeholderTextColor="#999"
            value={privateKey}
            onChangeText={setPrivateKey}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "96%",
            }}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan a QR code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.importButton_2}
              onPress={handleImportAccount}>
              <Text style={styles.importButtonText}>Import</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAccountItem}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setIsCreating(true)}>
              <Text style={styles.buttonText}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsImporting(true)}
              style={[styles.importButton]}>
              <Text style={styles.buttonText}>Import Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    color: color.white,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 14,
    color: color.white,
  },
  activeIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
  createButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#5cb85c",
  },
  importButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#337ab7",
    marginTop: 10,
  },
  importButton_2: {
    padding: 15,
    borderRadius: 50,
    width: "50%",
    alignItems: "center",
    backgroundColor: "#337ab7",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createContainer: {
    alignItems: "center",
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  chooseIconButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#444",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#555",
    color: color.white,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    color: color.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalDescription: {
    color: "#bbb",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  scanButton: {
    marginTop: 10,
  },
  scanButtonText: {
    color: "#00aaff",
    fontSize: 16,
  },
  importButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  closeText: {
    color: "#ff6666",
    marginTop: 10,
  },
});

export default AddAccount;
