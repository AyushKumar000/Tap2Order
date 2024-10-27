// Home.tsx
import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { Overlay } from "./overlay";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

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

    // Extract the endpoint and token from the data
    const [endpoint, token] = data.split('*');
    
    // Perform actions based on extracted `endpoint` and `token`
    if (endpoint && token) {
      // Use `endpoint` and `token` to fetch data or navigate
      try {
        console.log(endpoint, token);
        
        const menuResponse = await fetch(`${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const menuData = await menuResponse.json();
        
        // Navigate to Menu screen with `menuData` (if applicable)
        Alert.alert("Menu Retrieved", JSON.stringify(menuData));
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the menu data.");
      }
    } else {
      Alert.alert("Invalid QR Code", "The QR code does not contain a valid menu link.");
    }

    // Unlock the QR scanner after some delay
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
