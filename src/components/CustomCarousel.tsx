import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { moderateScale, scaleHeight, scaleWidth } from '../utils/scale';

const { width } = Dimensions.get('window');

interface ProductCarouselProps {
  images: string[];
  height?: number;
  containerWidth?: number;
  horizontalPadding?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}
const CustomCarousel: React.FC<ProductCarouselProps> = ({
  images,
  height = 500,
  containerWidth = width,
  horizontalPadding = 0,
  resizeMode = 'contain',
}) => {
  const progressValue = useSharedValue<number>(0);
  const adjustedWidth = containerWidth - horizontalPadding * 2;
  if (!images || images.length <= 1) {
    const uri = images?.[0];
    const isTypeNumber = typeof uri === 'number';
    return (
      <Image
        source={isTypeNumber ? (uri as any) : { uri }}
        style={[styles.image]}
        resizeMode={resizeMode}
      />
    );
  }

  return (
    <View>
      <Carousel
        width={adjustedWidth}
        height={scaleHeight(height)}
        data={images}
        scrollAnimationDuration={800}
        onProgressChange={(progress, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }) => (
          <Image
            source={typeof item === 'number' ? item : { uri: item }}
            style={styles.image}
            resizeMode={resizeMode}
          />
        )}
      />

      <Pagination.Basic
        progress={progressValue}
        data={images}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paginationContainer}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
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
  activeDot: {
    backgroundColor: colors.light.primary,
  },
});
