import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Href, Link, router, Stack } from "expo-router";
import { Button } from "react-native-paper";
import { Image } from "expo-image";

const CustomerScan = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 20 }}>
        <Image
          source={require("@/assets/images/QR.jpg")}
          style={styles.image}
        />
        {isPermissionGranted == false ? (
          <Pressable onPress={requestPermission}>
            <Text style={styles.buttonStyle}>REQUEST PERMISSIONS</Text>
          </Pressable>
        ) : (
          ""
        )}
        <Link href={"./support" as Href} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              SCAN QR TO ORDER
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    height: 400,
    width: 300,
    borderRadius: 25,
  },
});

export default CustomerScan;
