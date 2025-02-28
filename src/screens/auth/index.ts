import router from "@navigation/router";
import ImportWalletScreen from "./ImportWallet";
import CreateNewWalletScreen from "./CreateNewWallet";
import SecureWalletScreen from "./SecureWallet";
import SecureWalletInfoScreen from "./SecureWalletInfo";
import SecureWalletValidScreen from "./SecureWalletValid";
import SecureWalletGenSeedPhraseScreen from "./SecureWalletGenSeedPhrase";
import SecureWalletSuccessScreen from "./SecureWalletSuccess";

export const auth = {
  [router.IMPORT_WALLET]: ImportWalletScreen,
  [router.CREATE_NEW_WALLET]: CreateNewWalletScreen,
  [router.SECURE_WALLET]: SecureWalletScreen,
  [router.SECURE_WALLET_INFO]: SecureWalletInfoScreen,
  [router.SECURE_WALLET_VALID]: SecureWalletValidScreen,
  [router.SECURE_WALLET_GEN]: SecureWalletGenSeedPhraseScreen,
  [router.SECURE_WALLET_SUCCESS]: SecureWalletSuccessScreen,
};
