// app/index.tsx
import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Href, useRouter } from "expo-router"; // Expo router hook for navigation
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = () => {
  const router = useRouter();
  let replace = false;

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken"); // Check for token
      if (token) {
        replace = true; // Redirect to VendorIndex if token exists
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/cart.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome To Tap2Order</Text>
      <Text style={styles.subtitle}>Choose Your role</Text>

      {/* Navigate to Vendor Tabs */}
      <TouchableOpacity
        onPress={() => {
          if (replace) {
            router.push("../vendor");
          } else {
            router.push("/(auth)/sign-in" as Href);
          }
        }}
        style={styles.vendorButton}
      >
        <Text style={styles.buttonText}>I am Vendor</Text>
      </TouchableOpacity>

      {/* Navigate to Customer Tabs */}
      <TouchableOpacity
        onPress={() => router.push("/customer" as Href)}
        style={styles.vendorButton}
      >
        <Text style={styles.buttonText}>I am Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  vendorButton: {
    padding: 10,
    backgroundColor: "orange",
    marginBottom: 20,
    width: "70%",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default WelcomeScreen;
