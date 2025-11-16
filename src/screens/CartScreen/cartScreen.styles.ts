import { StyleSheet } from 'react-native';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/scale';
import { colors } from '../../theme/colors';
import { hexToRgba } from '../../utils/hexToRgba.utility';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    gap: moderateScale(4),
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: hexToRgba(colors.light.primary, 0.1),
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    elevation: 2,
    backgroundColor: '#dee4f0ff',
    overflow: 'hidden',
  },
  removeBtn: { position: 'absolute', right: 4, top: 4 },
  itemImage: {
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderRadius: moderateScale(8),
  },
  itemTitleContainer: { flex: 1, marginLeft: moderateScale(10) },
  itemTitle: {
    fontSize: scaleFont(15),
    fontWeight: '600',
    color: colors.light.text,
  },
  itemPrice: {
    fontSize: scaleFont(14),
    color: colors.light.primary,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(6),
  },

  qtyText: {
    marginHorizontal: scaleWidth(8),
    fontWeight: '600',
    fontSize: scaleFont(15),
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderTopWidth: 1,
    borderColor: colors.light.extraLightGray,
  },
  totalContainer: { flex: 1 },
  totalLabel: { color: colors.light.gray, fontSize: scaleFont(14) },
  totalValue: {
    color: colors.light.text,
    fontSize: scaleFont(18),
    fontWeight: '700',
  },

  ListEmptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    padding: moderateScale(10),
    gap: moderateScale(10),
    borderWidth: 1,
    borderRadius: moderateScale(12),
    borderColor: colors.light.extraLightGray,
  },
  clearCartBtn: {
    borderRadius: moderateScale(8),
    width: '40%',
    backgroundColor: hexToRgba(colors.light.primary, 0.1),
    paddingVertical: scaleHeight(4),
  },
});
