import { FlatList, Image, RefreshControl, View } from 'react-native';
import CategoryList from '../../components/CategoryList';
import CustomLoader from '../../components/CustomLoader';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBar from '../../components/SearchBar';
import { colors } from '../../theme/colors';
import { bannerImages } from './homeScreen.constants';
import { styles } from './homeScreen.styles';
import useHome from './hooks/useHome';
import CustomCarousel from '../../components/CustomCarousel';
import { moderateScale } from '../../utils/scale';
import FallBackImage from '../../components/FallBackImage';
import { useEffect } from 'react';

export default function HomeScreen({ navigation }: any) {
  const {
    states: {
      allProducts,
      skip,
      setSkip,
      setFIlterValue,
      category,
      setCategory,
      limit,
      paginationLock,
    },
    services: { getAllProducts, getAllCategories },
  } = useHome({});
  const initialLoad = getAllProducts.isLoading && skip === 0;
  const total = getAllProducts?.data?.total || 0;
  return (
    <ScreenWrapper
      style={styles.container}
      safeAreaStyle={styles.safeAreaContainer}
    >
      <View style={styles.searchBarContainer}>
        <Image
          source={require('../../assets/images/myCartLogoFilled.png')}
          style={[styles.image]}
        />
        <SearchBar
          valueHandler={value => {
            setSkip(0);
            setFIlterValue(value);
          }}
        />
      </View>

      {initialLoad || getAllCategories?.isLoading ? (
        <CustomLoader />
      ) : (
        <View style={styles.mainProductsContainer}>
          <FlatList
            data={allProducts || []}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            ListHeaderComponent={() => (
              <View>
                <View style={styles.categoryListContainer}>
                  <CategoryList
                    data={[
                      {
                        slug: 'all',
                        name: 'All',
                      },
                      ...getAllCategories?.data,
                    ]}
                    selected={category}
                    onSelect={cat => {
                      setSkip(0);
                      setCategory(cat);
                    }}
                  />
                </View>

                <CustomCarousel
                  images={bannerImages}
                  height={200}
                  resizeMode={'cover'}
                />
              </View>
            )}
            ListEmptyComponent={() => (
              <FallBackImage
                url={require('./../../assets/images/empty-box.png')}
              />
            )}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (paginationLock.current) return;
              if (skip + limit >= total) return;
              paginationLock.current = true;
              setSkip(prev => prev + limit);
            }}
            columnWrapperStyle={styles.columnWrapperStyle}
            contentContainerStyle={styles.productsContentContainerStyle}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', { id: item.id })
                }
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={initialLoad}
                onRefresh={() => {
                  setSkip(0);
                  getAllProducts?.refetch();
                }}
              />
            }
            ListFooterComponent={() =>
              paginationLock.current && skip + limit < total ? (
                <CustomLoader />
              ) : null
            }
          />
        </View>
      )}
    </ScreenWrapper>
  );
}
