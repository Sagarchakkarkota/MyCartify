import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import CustomCarousel from '../../components/CustomCarousel';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';
import AddToCartButton from './components/AddToCartButton';
import Rating from './components/Rating';
import useProductDetail from './hooks/useProductDetail';
import { styles } from './ProductDetail.styles';
import ReviewCard from './components/ReviewCard';

export default function ProductDetailScreen({ route }: any) {
  const { id } = route.params;
  const {
    services: { getSingleProducts },
  } = useProductDetail({ id });

  if (getSingleProducts?.isLoading || !getSingleProducts?.data) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    );
  }
  const productData = getSingleProducts?.data;
  console.log(productData);
  return (
    <ScreenWrapper style={{ padding: 0 }}>
      <ScrollView>
        <CustomCarousel images={productData.images} />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{productData.title}</Text>
          <Text style={styles.price}>₹{productData.price}</Text>
          <Text style={styles.desc}>{productData.description}</Text>
          <Rating productData={productData} />
          <AddToCartButton product={productData} />
          <Text style={styles.title}>Rating & Reviews</Text>
          {productData?.reviews?.map((item: any, index: number) => (
            <ReviewCard reviewData={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
