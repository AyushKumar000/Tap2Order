import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import MinusIcon from "../../assets/icons/minusIcon";
import PlusIcon from "../../assets/icons/plusIcon";
import Button from "../../components/button";
import { styles } from "./styles";

interface CusCartCardProps {
  item: item;
}

interface item {
  menu: {
    item_name: string;
    image: string;
  };
  order_code: string;
  quantity: number;
  total_price: number;
  payment: string;
  status: string;
}

const CusCartCard = ({ item }: CusCartCardProps) => {
  const { menu, order_code, quantity, total_price, payment, status } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainContianer}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={{ position: "absolute", height: "100%", width: "100%" }}
              source={{ uri: menu.image }}
            />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.dishName}>{menu.item_name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>Order Code : {order_code}</Text>
            <Text style={styles.text}>Quantity : {quantity}</Text>
            <Text style={styles.text}>Price : {total_price}</Text>
            <Text style={styles.text}>Payment : {payment}</Text>
            <Text style={styles.text}>Status : {status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CusCartCard;
