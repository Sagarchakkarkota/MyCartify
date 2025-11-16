import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/scale';

export const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: colors.light.primary,
  },
  searchBarContainer: { backgroundColor: colors.light.primary, padding: 10 },
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    padding: 0,
  },
  categoryListContainer: { paddingHorizontal: 10 },
  mainProductsContainer: {
    flex: 1,
  },
  productsContentContainerStyle: {
    gap: moderateScale(16),
    paddingBottom: scaleHeight(16),
  },
  categoryContentContainerStyle: {
    paddingVertical: moderateScale(10),
  },

  columnWrapperStyle: {
    justifyContent: 'space-between',
    padding: 10,
  },
  categoryChip: {
    backgroundColor: colors.light.background,
    paddingHorizontal: scaleWidth(14),
    borderRadius: moderateScale(20),
    height: scaleHeight(24),
    marginRight: scaleWidth(10),
    borderWidth: 1,
    borderColor: colors.light.extraLightGray,
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  categoryText: {
    color: colors.light.text,
    fontSize: scaleFont(14),
  },
  categoryTextActive: {
    color: colors.light.background,
    fontWeight: '600',
  },
  cardContainer: {
    width: '48%',
    backgroundColor: colors.light.background,
    borderRadius: moderateScale(20),
    shadowColor: colors.light.primary,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'transparent',

    padding: scaleWidth(10),
  },
  cardImage: {
    width: '100%',
    height: scaleHeight(140),
    objectFit: 'contain',
  },
  cardInfo: {},
  cardTitle: { fontSize: scaleFont(14), fontWeight: '600', color: '#111827' },
  cardDesc: {
    fontSize: scaleFont(12),
    color: colors.light.gray,
    marginVertical: scaleHeight(4),
  },
  cardPrice: {
    fontSize: scaleFont(16),
    color: colors.light.primary,
    fontWeight: '700',
  },
});
