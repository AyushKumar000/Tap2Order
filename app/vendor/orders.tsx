import CartCard from "@/components/cartCard";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import { getCartEndpoint } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

interface CartItem {
  _id: string;
  order_code: string;
  menu: {
    item_name : string;
    image : string;
  };
  quantity: number;
  image: string;
  payment: string;
  status: string;
  total_price: number;
}

const VendorMenu = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(`${getCartEndpoint()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleProcessing = async (itemId: any) => {
    try {
      const response = await fetch(`${getCartEndpoint()}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Ensure the backend reads it as JSON
        },
        body: JSON.stringify({ status: "processing" }), // Send item details
      });
      

      const data = await response.json();
      
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, status: data.status } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleDone = async (itemId: any) => {
    try {
      const response = await fetch(`${getCartEndpoint()}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Ensure the backend reads it as JSON
        },
        body: JSON.stringify({ status: "completed" }), // Send item details
      });      
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#FFA726" }}>
      <StatusBar backgroundColor="#FFA726" style="light" />
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ marginTop: 30, marginBottom: 5, fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333" }}>
          Vendor Orders
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#BA8E23" style={{ marginTop: 20, flex: 1, justifyContent: 'center' }} />
        ) : (
          <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 20, width: "100%" }}>
          {cartItems.length === 0 ? (
            <Text style={{ fontSize: 18, color: "#333", textAlign: "center", marginTop: 20 }}>
              No orders found.
            </Text>
          ) : (
            cartItems.map((item) => (
              <CartCard
                key={item._id}
                canEdit={item.status === "pending"}
                onEdit={() => handleProcessing(item._id)}
                onDelete={() => handleDone(item._id)}
                item={item}
              />
            ))
          )}
        </ScrollView>
        )}
      </View>
    </View>
  );
};

export default VendorMenu;
