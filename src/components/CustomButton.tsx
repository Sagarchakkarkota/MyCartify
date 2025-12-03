import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { scaleFont, scaleWidth } from '../utils/scale';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  type?: 'pressable' | 'touchableOpacity';
  loading?: boolean;
}
const CustomButton = ({
  style,
  title,
  onPress,
  textStyle,
  disabled = false,
  type = 'pressable',
  loading = false,
}: CustomButtonProps) => {
  const ButtonComponent =
    type === 'touchableOpacity' ? TouchableOpacity : Pressable;
  return (
    <ButtonComponent
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      {...(type === 'touchableOpacity' ? { activeOpacity: 0.7 } : {})}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.light.background} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </ButtonComponent>
  );
};

export default CustomButton;

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: scaleWidth(12),
    paddingHorizontal: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(8),
  },
  buttonText: {
    color: colors.light.background,
    fontWeight: '600',
    fontSize: scaleFont(16),
  },
  disabled: { opacity: 0.5 },
});
