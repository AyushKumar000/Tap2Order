import React from "react";
import { View, Text, StatusBar, ScrollView, ToastAndroid } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import MenuCard from "@/components/menuCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCartEndpoint } from "@/constants/api";

const showMenu = () => {
  const { menuData } = useLocalSearchParams();
  const data = JSON.parse(menuData);

  const addOrderId = async (newOrderId: any) => {
    try {
      const existingIdsString = await AsyncStorage.getItem('orderIds');
      const existingIds = existingIdsString ? JSON.parse(existingIdsString) : [];
  
      if (!existingIds.includes(newOrderId)) {
        existingIds.push(newOrderId);
      }
  
      await AsyncStorage.setItem('orderIds', JSON.stringify(existingIds));
      console.log('Order ID added successfully!');
    } catch (error) {
      console.error('Error saving order ID:', error);
    }
  };

  const handleOrder = async (orderDetails: any) => {
    try {
      const response = await fetch(`${getCartEndpoint()}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to create cart item');
      }

      const cartItem = await response.json();
      ToastAndroid.show('Order Created successfully!', ToastAndroid.SHORT);
      await addOrderId(cartItem.order_code);
      router.replace('../(tabs)/myOrder');

    } catch (error) {
      console.error('Error creating cart item:', error);
    }
  };

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
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
            width: "100%",
          }}
        >
          {data.map((item) => (
            <MenuCard
              key={item._id}
              menuItem={item}
              canEdit={false}
              onEdit={() => {}}
              onDelete={() => {}}
              onOrder={handleOrder} 
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default showMenu;
