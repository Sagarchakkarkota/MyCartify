import { FlatList, Image, RefreshControl, View } from 'react-native';
import CategoryList from '../../components/CategoryList';
import CustomLoader from '../../components/CustomLoader';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBar from '../../components/SearchBar';
import { colors } from '../../theme/colors';
import { bannerImages } from './homeScreen.constants';
import { styles } from './HomeScreen.styles';
import useHome from './hooks/useHome';
import CustomCarousel from '../../components/CustomCarousel';
import { moderateScale } from '../../utils/scale';

export default function HomeScreen({ navigation }: any) {
  const {
    states: { filterValue, setFIlterValue, category, setCategory },
    services: { getAllProducts, getAllCategories },
  } = useHome({});

  return (
    <ScreenWrapper
      style={styles.container}
      safeAreaStyle={styles.safeAreaContainer}
    >
      <View style={{ backgroundColor: colors.light.primary, padding: 10 }}>
        <SearchBar value={filterValue} onChange={setFIlterValue} />
      </View>

      {getAllProducts?.isLoading || getAllCategories?.isLoading ? (
        <CustomLoader />
      ) : (
        <View style={styles.mainProductsContainer}>
          <FlatList
            data={getAllProducts?.data?.products || []}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            ListHeaderComponent={() => (
              <View>
                <CategoryList
                  data={[
                    {
                      slug: 'all',
                      name: 'All',
                    },
                    ...getAllCategories?.data,
                  ]}
                  selected={category}
                  onSelect={setCategory}
                />
                <CustomCarousel
                  images={bannerImages}
                  height={200}
                  horizontalPadding={moderateScale(10)}
                  resizeMode={'cover'}
                />
              </View>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  height={200}
                  width={200}
                  source={require('./../../assets/images/empty-box.png')}
                />
              </View>
            )}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
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
                refreshing={getAllProducts?.isLoading}
                onRefresh={() => {
                  getAllProducts?.refetch();
                }}
              />
            }
          />
        </View>
      )}
    </ScreenWrapper>
  );
}
