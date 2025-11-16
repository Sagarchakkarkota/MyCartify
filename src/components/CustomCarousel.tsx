import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { scaleHeight } from '../utils/scale';
import CustomDots from './CustomDots';

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
  height = 400,
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
        style={[
          styles.image,
          { width: adjustedWidth, height: scaleHeight(height) },
        ]}
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

      <CustomDots progress={progressValue} count={images.length} />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
