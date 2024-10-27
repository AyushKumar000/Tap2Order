import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Href, Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ToastAndroid,
} from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { getSignInEndpoint } from "../../constants/api";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      console.log(email, password);

      const response = await axios.post(getSignInEndpoint(), {
        email,
        password,
      });

      const { token, message } = response.data;

      ToastAndroid.show("Login successfully!", ToastAndroid.SHORT);

      await AsyncStorage.setItem("userToken", token);
      router.replace("/vendor" as Href);
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Sign-in failed");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundArc}>
        <View style={styles.upperArc} />
        <View style={styles.lowerArc} />
      </View>

      {/* Circular Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          Sign In
        </Button>
        <Text style={styles.link}>
          <Link href={"/sign-up" as Href}>Don't have an account? Sign Up</Link>
        </Text>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {errorMessage}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  backgroundArc: {
    position: "absolute",
    width: width * 2,
    height: height * 0.5,
    top: -height * 0.2,
    left: -width * 0.5,
    borderRadius: width,
    overflow: "hidden",
    flexDirection: "row",
  },
  upperArc: {
    flex: 1,
    backgroundColor: "#FFA726",
  },
  lowerArc: {
    flex: 1,
    backgroundColor: "#FFA726",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ffffff",
    overflow: "hidden",
    marginBottom: 50,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FFA726",
  },
  link: {
    marginTop: 10,
    color: "#FFA726",
    textAlign: "center",
  },
});

export default SignIn;
