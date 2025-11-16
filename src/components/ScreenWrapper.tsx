import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { colors } from '../theme/colors';
import { moderateScale } from '../utils/scale';

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
  const { theme } = useTheme();

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
