// app/vendor/_layout.tsx
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StatusBar } from 'expo-status-bar'

export default function VendorLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: "#FFA726",
        headerShown: false,
      }}>
        <Tabs.Screen
        name="menu"
        options={{
        title: 'Menu',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'restaurant' : 'restaurant-outline'} color={color} />
        ),
        }}
      />
        <Tabs.Screen
        name="orders"
        options={{
        title: 'Orders',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
        ),
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
        ),
        }}
      />
      <StatusBar backgroundColor='#161622' style='light' />
    </Tabs>
  );
}
