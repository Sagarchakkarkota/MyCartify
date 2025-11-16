import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  SharedValue,
} from 'react-native-reanimated';
import { moderateScale, scaleHeight, scaleWidth } from '../utils/scale';
import { colors } from '../theme/colors';

const CustomDots = ({
  count,
  progress,
}: {
  count: number;
  progress: SharedValue<number>;
}) => {
  const activeIndex = useDerivedValue(() => Math.round(progress.value));

  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: count }).map((_, i) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor:
              activeIndex.value === i
                ? colors.light.primary
                : colors.light.gray,
          };
        });

        return <View key={i} style={[styles.dot, animatedStyle]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: scaleWidth(10),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: scaleWidth(8),
    height: scaleHeight(8),
    borderRadius: moderateScale(20),
    marginHorizontal: scaleWidth(4),
    backgroundColor: colors.light.gray,
  },
});

export default CustomDots;
