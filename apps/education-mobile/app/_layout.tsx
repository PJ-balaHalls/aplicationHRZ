import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { AccessibilityProvider } from '../src/context/AccessibilityContext';
import '../src/styles/global.css';

// Previne o auto-hide para controlarmos a entrada do Minimalismo Funcional
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'), // Certifique-se de baixar e alocar na pasta
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null; // Placeholder ou Skeleton aqui se necessário

  return (
    <AccessibilityProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ 
        headerShown: false, // Navegação Base é invisível; customizamos nas Stack-Scenes
        animation: 'fade', // Transição polida
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/register" />
      </Stack>
    </AccessibilityProvider>
  );
}