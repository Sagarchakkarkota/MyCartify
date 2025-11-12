import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { scaleHeight } from '../utils/scale';

const { width } = Dimensions.get('window');

interface ProductCarouselProps {
  images: string[];
}

const CustomCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const progressValue = useSharedValue<number>(0);
  if (!images || images.length <= 1) {
    const uri = images?.[0];
    return (
      <Image source={{ uri }} style={[styles.image, { resizeMode: 'cover' }]} />
    );
  }

  return (
    <View>
      <Carousel
        width={width}
        height={scaleHeight(500)}
        data={images}
        scrollAnimationDuration={800}
        onProgressChange={(progress, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
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
    width: width,
    height: scaleHeight(500),
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: colors.light.gray,
  },
  activeDot: {
    backgroundColor: colors.light.primary,
  },
});
