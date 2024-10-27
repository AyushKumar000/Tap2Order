import axios from "axios";
import { Href, Link, router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { getSignUpEndpoint } from "../../constants/api";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields");
      setSnackbarVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSnackbarVisible(true);
      return;
    }
    try {
      console.log(email, password);

      const response = await axios.post(
        getSignUpEndpoint(), // Your signup API endpoint
        {
          email,
          password,
        }
      );

      // Handle successful signup response
      const { message } = response.data;
      Alert.alert("Tap2Order", message || "User registered successfully");

      router.push("/(auth)/sign-in" as Href);
    } catch (error: any) {
      console.log(error);

      // Handle errors
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Signup failed");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Arc */}
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
        <Text style={styles.title}>Sign Up</Text>
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
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
        <Text style={styles.link}>
          <Link href={"/sign-in" as Href}>Don't have an account? Sign In</Link>
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
    backgroundColor: "#FFA726", // Attractive food-related color
  },
  lowerArc: {
    flex: 1,
    backgroundColor: "#FFA726", // Complementary color
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
  },
  formContainer: {
    paddingTop: 10,
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

export default SignUp;
