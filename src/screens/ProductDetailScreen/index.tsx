import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import CustomCarousel from '../../components/CustomCarousel';
import CustomLoader from '../../components/CustomLoader';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddToCartButton from './components/AddToCartButton';
import Rating from './components/Rating';
import ReviewCard from './components/ReviewCard';
import useProductDetail from './hooks/useProductDetail';
import { styles } from './productDetail.styles';

export default function ProductDetailScreen({ route }: any) {
  const { id } = route.params;
  const {
    services: { getSingleProducts },
  } = useProductDetail({ id });

  if (getSingleProducts?.isLoading || !getSingleProducts?.data) {
    return <CustomLoader />;
  }
  const productData = getSingleProducts?.data;
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
          {productData?.reviews?.length > 0 && (
            <>
              <Text style={styles.title}>Rating & Reviews</Text>
              <FlatList
                data={productData.reviews}
                horizontal
                renderItem={({ item }) => <ReviewCard reviewData={item} />}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={styles.reviewContainer}
              />
            </>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
