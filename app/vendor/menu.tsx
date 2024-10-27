import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
  Alert, // Import Alert for confirmation dialog
} from "react-native";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import MenuCard from "@/components/menuCard";
import { getMenuEndpoint } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icon library

// Define the MenuItem interface
interface MenuItem {
  _id: string;
  item_name: string;
  price: number;
  image: string;
  quantity: number;
}

const VendorMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null); // State for current item

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(`${getMenuEndpoint()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMenuItems(data);
        console.log("Menu data" + data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to handle creating or updating a menu item
  const saveMenuItem = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const method = currentItem?._id ? "PUT" : "POST"; // Check if it's an edit or new item
      const url = currentItem?._id
        ? `${getMenuEndpoint()}/${currentItem._id}`
        : getMenuEndpoint();

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem), // Send item details
      });

      const data = await response.json();

      if (method === "POST") {
        setMenuItems((prevItems) => [...prevItems, data]); // Add new item
      } else {
        setMenuItems((prevItems) =>
          prevItems.map((item) => (item._id === data._id ? data : item))
        ); // Update existing item
      }

      setModalVisible(false); // Close the modal
      setCurrentItem(null); // Reset current item
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  // Function to handle deleting a menu item
  const deleteMenuItem = (itemId: string) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("userToken");
              await fetch(`${getMenuEndpoint()}/${itemId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              setMenuItems((prevItems) =>
                prevItems.filter((item) => item._id !== itemId)
              ); // Remove deleted item
            } catch (error) {
              console.error("Error deleting menu item:", error);
            }
          },
        },
      ]
    );
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
          Vendor Menu
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
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <MenuCard
                  key={item._id}
                  menuItem={item}
                  canEdit={true}
                  onEdit={() => {
                    setCurrentItem(item); // Set the current item for editing
                    setModalVisible(true);
                  }}
                  onDelete={() => deleteMenuItem(item._id)} // Pass item ID to delete
                  onOrder={() => {}}
                />
              ))
            ) : (
              <Text style={{ fontSize: 18, color: "#333", marginTop: 20 }}>
                No menu available
              </Text>
            )}

            <View
              style={{
                backgroundColor: "#BA8E23",
                borderRadius: 50,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setCurrentItem({
                    _id: "",
                    item_name: "",
                    price: 0,
                    image: "",
                    quantity: 0,
                  }); // Reset for new item
                  setModalVisible(true);
                }}
              >
                <Icon name="add" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}
            >
              {currentItem?._id ? "Edit Menu Item" : "Add New Menu Item"}
            </Text>
            <TextInput
              label="Item Name"
              value={currentItem?.item_name}
              onChangeText={(text) =>
                setCurrentItem({ ...currentItem, item_name: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                marginBottom: 10,
                padding: 10,
              }}
            />
            <TextInput
              label="Price"
              value={currentItem?.price.toString()}
              onChangeText={(text) =>
                setCurrentItem({ ...currentItem, price: parseFloat(text) })
              }
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                marginBottom: 10,
                padding: 10,
              }}
            />
            <TextInput
              label="Image URL"
              value={currentItem?.image}
              onChangeText={(text) =>
                setCurrentItem({ ...currentItem, image: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                marginBottom: 10,
                padding: 10,
              }}
            />
            <TextInput
              label="Quantity"
              value={currentItem?.quantity.toString()}
              onChangeText={(text) =>
                setCurrentItem({ ...currentItem, quantity: parseInt(text) })
              }
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                marginBottom: 20,
                padding: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
              <Button
                title={currentItem?._id ? "Save" : "Create"}
                onPress={saveMenuItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VendorMenu;
