import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { HorazionStar } from '../src/components/ui/HorazionStar';
import { useAccessibility } from '../src/context/AccessibilityContext';
import { MockFeed } from '../src/components/ui/MockFeed';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ClarityButton } from '../src/components/ui/ClarityButton';
import { useRouter } from 'expo-router';

export default function EntryPoint() {
  const [loading, setLoading] = useState(true);
  const { theme } = useAccessibility();
  const router = useRouter();

  useEffect(() => {
    // Simulação de check de sessão / sincronização de blocos
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <View style={{ backgroundColor: theme.background }} className="flex-1 items-center justify-center">
        <HorazionStar />
        <Text style={{ color: theme.textSecondary }} className="mt-8 font-mono text-xs uppercase tracking-[4px]">
          Horizion Systems
        </Text>
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(1000)} className="flex-1 bg-white">
       <View className="absolute inset-0 opacity-10">
         <MockFeed />
       </View>
       
       <View className="flex-1 justify-end p-8 pb-16">
          <Text className="text-horazion-black text-5xl font-bold tracking-tighter mb-4">
            Clareza.{"\n"}Organização.{"\n"}Potencial.
          </Text>
          
          <View className="gap-4">
            <ClarityButton 
              label="Iniciar Registro" 
              variant="primary" 
              onPress={() => router.push('/auth/register/01-auth')} 
            />
            <ClarityButton 
              label="Entrar" 
              variant="secondary" 
              onPress={() => router.push('/auth/login')} 
            />
          </View>
       </View>
    </Animated.View>
  );
}