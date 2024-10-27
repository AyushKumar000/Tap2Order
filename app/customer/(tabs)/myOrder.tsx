import CartCard from "@/components/cartCard";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import { getCartEndpoint } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import CusCartCard from "@/components/cutomerCart";

interface CartItem {
  _id: string;
  order_code: string;
  menu: {
    item_name: string;
    image: string;
  };
  quantity: number;
  image: string;
  payment: string;
  status: string;
  total_price: number;
}

const CustomerOrder = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrderIds = async () => {
    try {
      const orderIdsString = await AsyncStorage.getItem("orderIds");
      const orderIds = orderIdsString ? JSON.parse(orderIdsString) : [];
      return orderIds;
    } catch (error) {
      console.error("Error retrieving order IDs:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const orderIds = await getOrderIds();
        console.log(orderIds);

        const response = await fetch(
          `${getCartEndpoint()}/byOrderIds?orderIds=${encodeURIComponent(
            JSON.stringify(orderIds)
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#FFA726" }}>
      <StatusBar backgroundColor="#FFA726" style="light" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 30,
            marginBottom: 5,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          My Orders
        </Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#BA8E23"
            style={{ marginTop: 20, flex: 1, justifyContent: "center" }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 20,
              width: "100%",
            }}
          >
            {cartItems.map((item) => (
              <CusCartCard
                key={item._id}
                item={item}              
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CustomerOrder;
