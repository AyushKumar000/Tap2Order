// app/vendor/dashboard.tsx
import CartCard from "@/components/cartCard";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

const VendorMenu = () => {
  useEffect(() => {
    <StatusBar backgroundColor="#FFA726" style="light" />;
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#FFA726" }}>
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
          Vendor Orders
        </Text>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
          <CartCard
            canEdit={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onOrder={() => {}}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default VendorMenu;
