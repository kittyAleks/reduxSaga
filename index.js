/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

if (__DEV__ && typeof global.crypto !== "object") {
  global.crypto = {
    getRandomValues: (array: any[]) =>
      array.map(() => Math.floor(Math.random() * 256)),
  };
}

AppRegistry.registerComponent(appName, () => App);
