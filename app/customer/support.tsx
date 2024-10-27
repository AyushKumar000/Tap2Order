import { Camera, CameraView } from "expo-camera";
import { router, Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import { Overlay } from "./overlay";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleQRCodeScanned = async (data: string) => {
    if (!data || qrLock.current) return;

    qrLock.current = true;

    const [endpoint, token] = data.split("*");

    if (endpoint && token) {
      try {
        console.log(endpoint, token);

        const menuResponse = await fetch(`${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const menuData = await menuResponse.json();

        router.push({
          pathname: "./Vendor_Menu/showMenu",
          params: {
            menuData: JSON.stringify(menuData),
          },
        });
      } catch (error) {
        ToastAndroid.show("Failed to fetch the menu data.", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Invalid QR Code", ToastAndroid.SHORT);
    }

    setTimeout(() => {
      qrLock.current = false;
    }, 1000);
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => handleQRCodeScanned(data)}
      />
      <Overlay />
    </SafeAreaView>
  );
}
