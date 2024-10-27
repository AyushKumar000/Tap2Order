// app/vendor/dashboard.tsx
import { getMenuEndpoint, getSignOutEndpoint, getVendorEndpoint } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Href, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { StatusBar } from "expo-status-bar";

const VendorProfile = () => {
  const [vendorId, setVendorId] = useState(null);
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [des, setDes] = useState("");
  const [order, setOrder] = useState(0);
  const [menuUri, setMenuUri] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const callIt = async () => {
      const token = await AsyncStorage.getItem("userToken");

      setMenuUri(`${getMenuEndpoint()}*${token}`);
    };

    callIt();
  }, []);

  useEffect(() => {
    <StatusBar backgroundColor='#FFFF' style='light' />
  }, [])

  useEffect(() => {
    const initialize = async () => {
      const token = await AsyncStorage.getItem("userToken");

      try {
        const response = await axios.get(getVendorEndpoint(), {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        
        console.log(response);
        if (response.data) {
          
          // If vendor data exists, populate the fields
          const vendor = response.data;
          setVendorId(vendor._id);
          setName(vendor.name);
          setShop(vendor.owner_name);
          setDes(vendor.description);
          setOrder(vendor.no_of_orders);
        }
      } catch (error) {
        console.log(error);
        
        console.log("No vendor found, displaying blank form.");
      } finally {
        setIsLoading(false); // Loading finished
      }
    };

    initialize();
  }, []);

  const handleSaveChanges = async () => {
    const token = await AsyncStorage.getItem("userToken");
    
    try {
      if (vendorId) {
        // Update existing vendor
        await axios.put(
          `${getVendorEndpoint()}/${vendorId}`,
          {
            name,
            owner_name: shop,
            description: des,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
      } else {
        // Create a new vendor
        const response = await axios.post(
          getVendorEndpoint(),
          {
            name,
            owner_name: shop,
            description: des,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVendorId(response.data._id); // Save the vendor ID after creation
        ToastAndroid.show("Profile created successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save profile. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post(getSignOutEndpoint(), {});
      ToastAndroid.show("Logging Out Successfully!", ToastAndroid.SHORT);
      await AsyncStorage.removeItem("userToken");
      router.replace("../../" as Href);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Show loading indicator while loading
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Enter your name"
        onChangeText={setName}
      />
      <Text style={styles.label}>Shop Name</Text>
      <TextInput
        style={styles.input}
        value={shop}
        placeholder="Enter shop name"
        onChangeText={setShop}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={des}
        placeholder="Enter description"
        onChangeText={setDes}
      />

      <Text style={styles.label}>No of Orders : {order}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>

      <View style={styles.qrContainer}>
        {menuUri && (
          <View style={styles.qrstyle}>
            <QRCode value={`${menuUri}`} />
          </View>
        )}
      </View>
      <Button mode="contained" onPress={handleSignOut} style={styles.button}>
        Sign Out
      </Button>
      <View style={{alignItems: 'center', paddingVertical: 10}}>

      <Text style={{fontWeight:100}}>Copyright © 2024 Tap2Order</Text>
      <Text style={{fontWeight:100}}>Design & Developed By Ayush</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#d4d4d4",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#d4d4d4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#FFA726",
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FFA726",
    margin: 10,
    justifyContent: "center",
  },
  qrstyle: {
    margin: "auto",
  },
  qrContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
});

export default VendorProfile;
