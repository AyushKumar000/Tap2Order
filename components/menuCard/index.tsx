import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import MinusIcon from '../../assets/icons/minusIcon';
import PlusIcon from '../../assets/icons/plusIcon';
import StarIcon from '../../assets/icons/starIcon';
import Button from '../../components/button';
import { styles } from './styles';

// Define the props for the MenuCard
interface MenuCardProps {
  canEdit: boolean;
  menuItem: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onOrder: (data: any) => void; // Update this
}

interface MenuItem {
  _id: string; // Adjust type as needed
  item_name: string;
  price: number;
  image: string;
  quantity: number;
}

const MenuCard = ({
  canEdit = false,
  menuItem,
  onEdit = () => {},
  onDelete = () => {},
  onOrder = () => {}, // Keep the default empty function
}: MenuCardProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleOrder = async () => {
    if (quantity > 0) {
      // Calculate total price
      const total_price = quantity * menuItem.price;
      const orderDetails = {
        quantity,
        total_price,
        menu: menuItem._id, // Send the whole menuItem
      };
      onOrder(orderDetails); // Call the onOrder function passed down
      setQuantity(0);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bottomLine}></View>
      <View style={styles.mainContianer}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={{ position: 'absolute', height: '100%', width: '100%' }}
              source={{ uri: menuItem.image }}
            />
          </View>
          {!canEdit && (
            <View
              style={{
                ...styles.quantityContainer,
                borderColor: '#FFA726',
                backgroundColor: quantity === 0 ? '#FFCC80' : '#FFA726',
              }}
            >
              {quantity === 0 && (
                <Pressable
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setQuantity((prev: number) => prev + 1)}
                >
                  <Text style={{ color: 'white' }}>Add</Text>
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
              {quantity !== 0 && <Text style={{ color: 'white' }}>{quantity}</Text>}
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
          <Text style={styles.dishName}>{menuItem.item_name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContiner}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </View>
            <Text style={styles.text}>40 rating</Text>
            <Text style={styles.text}>Price : {menuItem.price}</Text>
            <Text style={styles.text}>Quantity : {menuItem.quantity}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {canEdit && (
              <Button borderColor="#FFA726" onClick={onEdit}>
                <Text style={{ color: '#FFA726' }}>Edit</Text>
              </Button>
            )}
            {canEdit && (
              <Button borderColor="#F80057" onClick={onDelete}>
                <Text style={{ color: '#F80057' }}>Delete</Text>
              </Button>
            )}
            {!canEdit && (
              <Button bgColor="#FFA726" textColor={'white'} onClick={handleOrder}>
                <Text style={{ color: 'white' }}>Order Now</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
