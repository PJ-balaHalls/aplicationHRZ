import { Stack } from 'expo-router';

export default function RegisterLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true, 
      headerShadowVisible: false, // Horizon Clarity: sem sombras
      headerStyle: { backgroundColor: '#FFFFFF' },
      headerTintColor: '#000000',
      headerTitleStyle: { fontFamily: 'Inter-Medium', fontSize: 14 },
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="01-auth" options={{ title: "Identificação" }} />
      <Stack.Screen name="02-profile" options={{ title: "Dados Pessoais" }} />
      <Stack.Screen name="03-security" options={{ title: "Segurança" }} />
      <Stack.Screen name="04-legal" options={{ title: "Conformidade" }} />
      <Stack.Screen name="05-success" options={{ headerShown: false, gestureEnabled: false }} />
    </Stack>
  );
}