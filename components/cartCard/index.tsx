import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import MinusIcon from "../../assets/icons/minusIcon";
import PlusIcon from "../../assets/icons/plusIcon";
import Button from "../../components/button";
import { styles } from "./styles";

interface CartCardProps {
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
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

const CartCard = ({ canEdit, onEdit, onDelete, item }: CartCardProps) => {
  const { menu, order_code, quantity, total_price, payment } = item;

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
          </View>
          <View style={styles.buttonContainer}>
            {canEdit && (
              <>
                <Button borderColor="#FFA726" onClick={onEdit}>
                  <Text style={{ color: "#FFA726" }}>Processing</Text>
                </Button>
              </>
            )}
            <Button borderColor="#FFA726" onClick={onDelete}>
              <Text style={{ color: "#FFA726" }}>Done</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
