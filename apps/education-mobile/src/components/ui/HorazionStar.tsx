import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export const HorazionStar = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(1, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.2, 1) })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Svg width="80" height="80" viewBox="0 0 100 100">
        {/* Símbolo da Estrela Horazion - Geometria Pura */}
        <Path
          d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z"
          fill="#E50000"
        />
      </Svg>
    </Animated.View>
  );
};