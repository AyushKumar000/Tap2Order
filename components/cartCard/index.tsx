import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import MinusIcon from "../../assets/icons/minusIcon";
import PlusIcon from "../../assets/icons/plusIcon";
import StarIcon from "../../assets/icons/starIcon";
import Button from "../../components/button";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";

interface MenuCardProps {
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onOrder: () => void;
}

const CartCard = ({
  canEdit = false,
  onEdit = () => {},
  onDelete = () => {},
  onOrder = () => {},
}: MenuCardProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  return (
    <View style={styles.cardContainer}>
      {/* <View style={styles.topLine}></View> */}
      <View style={styles.bottomLine}></View>
      <View style={styles.mainContianer}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={{ position: "absolute", height: "100%", width: "100%" }}
              source={require("../../assets/images/pizza.jpeg")}
            />
          </View>
          {!canEdit && (
            <View
              style={{
                ...styles.quantityContainer,
                borderColor: "#FFA726",
                backgroundColor: quantity === 0 ? "#FFCC80" : "#FFA726",
              }}
            >
              {quantity === 0 && (
                <Pressable
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setQuantity((prev: number) => prev + 1)}
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </Pressable>
              )}
              {quantity !== 0 && (
                <Pressable
                  style={styles.quantitybtn}
                  onPress={() => setQuantity((prev: number) => prev - 1)}
                >
                  <MinusIcon height={10} width={10} />
                </Pressable>
              )}

              {quantity !== 0 && (
                <Text style={{ color: "white" }}>{quantity}</Text>
              )}
              {quantity !== 0 && (
                <Pressable
                  style={styles.quantitybtn}
                  onPress={() => setQuantity((prev: number) => prev + 1)}
                >
                  <PlusIcon height={15} width={15} />
                </Pressable>
              )}
            </View>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.dishName}>Chicken Masala Paneer</Text>
          <View style={styles.ratingContainer}>
            <Text>Order Code : 2468</Text>
            <Text>Quantity : 2</Text>
            <Text>Price : 200</Text>
            <Text>Payment : Paid</Text>
          </View>
          <View style={styles.buttonContainer}>
            {canEdit && (
              <Button borderColor="#FFA726" onClick={onEdit}>
                <Text style={{ color: "#FFA726" }}>Processing</Text>
              </Button>
            )}
            {canEdit && (
              <Button borderColor="#FFA726" onClick={onDelete}>
                <Text style={{ color: "#FFA726" }}>Completed</Text>
              </Button>
            )}
            {!canEdit && (
              <Button bgColor="#FFA726" textColor={"white"} onClick={onOrder}>
                <Text style={{ color: "white" }}>Order Now</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
