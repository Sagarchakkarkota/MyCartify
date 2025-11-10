import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import {
  scaleWidth,
  scaleHeight,
  moderateScale,
  scaleFont,
} from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    padding: moderateScale(16),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.background,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    marginBottom: scaleHeight(12),
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: scaleWidth(8),
    color: colors.light.text,
    paddingVertical: scaleHeight(8),
    fontSize: scaleFont(14),
  },
  categoryChip: {
    backgroundColor: colors.light.background,
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(8),
    borderRadius: moderateScale(20),
    marginRight: scaleWidth(10),
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  categoryText: {
    color: '#111827',
    fontSize: scaleFont(14),
  },
  categoryTextActive: {
    color: colors.light.background,
    fontWeight: '600',
  },
  cardContainer: {
    width: '48%',
    backgroundColor: colors.light.background,
    borderRadius: moderateScale(16),
    marginBottom: scaleHeight(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: scaleHeight(140),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
  },
  cardInfo: { padding: scaleWidth(10) },
  cardTitle: { fontSize: scaleFont(14), fontWeight: '600', color: '#111827' },
  cardDesc: {
    fontSize: scaleFont(12),
    color: '#6b7280',
    marginVertical: scaleHeight(4),
  },
  cardPrice: {
    fontSize: scaleFont(16),
    color: colors.light.primary,
    fontWeight: '700',
  },
});
