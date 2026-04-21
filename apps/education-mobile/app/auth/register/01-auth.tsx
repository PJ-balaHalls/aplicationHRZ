import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useRegisterStore } from '../../../src/store/useRegisterStore';
import { ArrowRight } from 'lucide-react-native';

export default function AuthScene() {
  const router = useRouter();
  const { horazionId, email, updateField } = useRegisterStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    // ZERO TRUST: Validação superficial de UX, validação real ocorrerá na API no final do fluxo
    if (!horazionId || horazionId.length < 4) {
      setError('Horizion ID deve conter pelo menos 4 caracteres.');
      return;
    }
    if (!email.includes('@')) {
      setError('Insira um e-mail válido.');
      return;
    }
    setError('');
    router.push('/auth/register/02-profile');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-horazion-white px-6 pt-8"
    >
      <View className="flex-1">
        <Text className="text-2xl font-bold text-horazion-black mb-2">
          Defina sua Identidade.
        </Text>
        <Text className="text-sm text-horazion-gray-800 mb-8 leading-relaxed">
          Seu Horizion ID é imutável e será a chave central para seus Blocos Vivos em todo o ecossistema.
        </Text>

        <View className="mb-6">
          <Text className="text-xs font-bold text-horazion-gray-900 uppercase tracking-wider mb-2">
            Horizion ID
          </Text>
          <View className="flex-row items-center border border-horazion-gray-200 rounded-lg bg-horazion-gray-100 px-4 h-14">
            <Text className="text-horazion-gray-800 font-mono text-base mr-1">@</Text>
            <TextInput
              className="flex-1 font-mono text-base text-horazion-black"
              placeholder="seu.nome"
              placeholderTextColor="#D4D4D4"
              autoCapitalize="none"
              autoCorrect={false}
              value={horazionId}
              onChangeText={(val) => updateField('horazionId', val.toLowerCase())}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xs font-bold text-horazion-gray-900 uppercase tracking-wider mb-2">
            E-mail de Recuperação
          </Text>
          <TextInput
            className="border border-horazion-gray-200 rounded-lg bg-horazion-gray-100 px-4 h-14 font-sans text-base text-horazion-black"
            placeholder="voce@exemplo.com"
            placeholderTextColor="#D4D4D4"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(val) => updateField('email', val)}
          />
        </View>

        {error ? (
          <Text className="text-horazion-red text-sm font-medium mb-4">{error}</Text>
        ) : null}
      </View>

      <View className="pb-8">
        <Pressable 
          onPress={handleNext}
          className="bg-horazion-black h-14 rounded-lg flex-row items-center justify-center active:opacity-80"
        >
          <Text className="text-horazion-white font-bold text-base mr-2">Continuar</Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}