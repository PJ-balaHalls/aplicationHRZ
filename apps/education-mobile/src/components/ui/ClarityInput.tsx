import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export const ClarityInput = ({ label, error, style, ...rest }: Props) => {
  const { theme, fontSizeScale } = useAccessibility();

  return (
    <View className="mb-6 w-full">
      <Text 
        style={{ color: theme.textPrimary, fontSize: 12 * fontSizeScale }}
        className="font-bold uppercase tracking-widest mb-2"
      >
        {label}
      </Text>
      <View 
        style={{ borderColor: error ? theme.brand : theme.border, backgroundColor: theme.surface }}
        className="border rounded-lg px-4 h-14 flex-row items-center"
      >
        <TextInput
          style={{ color: theme.textPrimary, fontSize: 16 * fontSizeScale, flex: 1 }}
          placeholderTextColor={theme.textSecondary}
          {...rest}
        />
      </View>
      {error && (
        <Text style={{ color: theme.brand }} className="text-xs mt-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
};