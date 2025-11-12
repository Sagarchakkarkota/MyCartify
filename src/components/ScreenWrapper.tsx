import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { hexToRgba } from '../utils/hexToRgba.utility';
import { moderateScale, scaleHeight } from '../utils/scale';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: object;
  safeAreaStyle?: any;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  safeAreaStyle = '',
}) => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, safeAreaStyle]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.primary} />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
});
