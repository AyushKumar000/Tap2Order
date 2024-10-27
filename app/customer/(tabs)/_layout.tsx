import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StatusBar } from 'expo-status-bar'

export default function CustomerLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: "#FFA726",
        headerShown: false,
      }}>
        <Tabs.Screen
        name="scan"
        options={{
        title: 'Scan QR',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'scan' : 'scan-outline'} color={color} />
        ),
        }}
      />
        <Tabs.Screen
        name="myOrder"
        options={{
        title: 'My Orders',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} />
        ),
        }}
      />
      <StatusBar backgroundColor='#161622' style='light' />
    </Tabs>
  );
}
