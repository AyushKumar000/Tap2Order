import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="support" options={{ headerShown: false }} />
      {/* <Stack.Screen name="showMenu" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
