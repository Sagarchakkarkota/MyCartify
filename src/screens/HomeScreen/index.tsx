import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import CategoryList from '../../components/CategoryList';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBar from '../../components/SearchBar';
import { styles } from './HomeScreen.styles';
import useHome from './hooks/useHome';
import { colors } from '../../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const {
    states: { filterValue, setFIlterValue, category, setCategory },
    services: { getAllProducts, getAllCategories },
  } = useHome({});
  if (getAllProducts?.isLoading || getAllCategories?.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    );
  }
  return (
    <ScreenWrapper
      style={styles.container}
      safeAreaStyle={styles.safeAreaContainer}
    >
      <View style={{ backgroundColor: colors.light.primary, padding: 10 }}>
        <SearchBar value={filterValue} onChange={setFIlterValue} />
      </View>
      <View style={styles.mainProductsContainer}>
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
        <FlatList
          data={getAllProducts?.data?.products || []}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          ListEmptyComponent={() => <Text></Text>}
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
    </ScreenWrapper>
  );
}
