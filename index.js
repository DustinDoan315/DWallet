/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import "react-native-get-random-values";
import { Buffer } from "buffer";

global.Buffer = global.Buffer || Buffer;

AppRegistry.registerComponent(appName, () => App);
