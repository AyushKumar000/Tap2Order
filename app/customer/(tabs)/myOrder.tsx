// app/customer/menu.tsx
import React from 'react';
import { View, Text } from 'react-native';

const CustomerOrder = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>My Orders</Text>
    </View>
  );
};

export default CustomerOrder;
