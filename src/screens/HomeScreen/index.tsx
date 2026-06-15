import { useCallback, useMemo } from 'react';
import { FlatList, Image, RefreshControl, View } from 'react-native';
import CategoryList from '../../components/CategoryList';
import CustomCarousel from '../../components/CustomCarousel';
import CustomLoader from '../../components/CustomLoader';
import FallBackImage from '../../components/FallBackImage';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBar from '../../components/SearchBar';
import { bannerImages } from './HomeScreen.constants';
import { styles } from './HomeScreen.styles';
import useHome from './hooks/useHome';
import { normalizeCategory } from '../../utils/normalizeCategory';

export default function HomeScreen({ navigation }: any) {
  const {
    states: {
      allProducts,
      skip,
      setSkip,
      setFilterValue,
      category,
      setCategory,
      limit,
      paginationLock,
    },
    services: { getAllProducts, getAllCategories },
  } = useHome({});
  const initialLoad = getAllProducts.isLoading && skip === 0;
  const total = getAllProducts?.data?.total || 0;
  const categoryData = useMemo(() => {
    return getAllCategories?.data?.length
      ? [
          {
            slug: 'all',
            name: 'All',
          },
          ...getAllCategories.data.map(normalizeCategory),
        ]
      : [];
  }, [getAllCategories?.data]);

  const handleSearch = useCallback(
    (value: string) => {
      setSkip(0);
      setFilterValue(value);
    },
    [setFilterValue, setSkip],
  );
  const handleCategorySelect = useCallback(
    (cat: string) => {
      setSkip(0);
      setCategory(cat);
    },
    [setSkip, setCategory],
  );
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
        <SearchBar valueHandler={handleSearch} />
      </View>

      {initialLoad || getAllCategories?.isLoading ? (
        <CustomLoader />
      ) : (
        <View style={styles.mainProductsContainer}>
          <FlatList
            data={allProducts || []}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            ListHeaderComponent={() =>
              allProducts?.length ? (
                <View>
                  <View style={styles.categoryListContainer}>
                    <CategoryList
                      data={categoryData}
                      selected={category}
                      onSelect={handleCategorySelect}
                    />
                  </View>

                  <CustomCarousel
                    images={bannerImages}
                    height={200}
                    resizeMode={'cover'}
                  />
                </View>
              ) : null
            }
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
            // contentContainerStyle={styles.productsContentContainerStyle}
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
