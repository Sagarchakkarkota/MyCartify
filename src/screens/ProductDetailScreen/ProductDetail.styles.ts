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
  container: { flex: 1 },
  mainContainer: { padding: moderateScale(16), gap: moderateScale(4) },
  title: {
    fontSize: scaleFont(22),
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: scaleHeight(6),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  rating: { fontSize: scaleFont(14), fontWeight: '600' },
  price: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: colors.light.primary,
    marginBottom: scaleHeight(10),
  },
  desc: {
    color: colors.light.gray,
    fontSize: scaleFont(15),
    lineHeight: 22,
  },
  reviews: { fontSize: scaleFont(24), fontWeight: '600' },
  reviewContainer: { gap: moderateScale(8) },
  reviewCardContainer: {
    width: moderateScale(300),
    alignSelf: 'center',
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: hexToRgba(colors.light.extraLightGray, 0.4),
    gap: moderateScale(16),
  },
  picker: {
    height: scaleHeight(50),
    borderColor: colors.light.extraLightGray,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scaleWidth(10),
  },
  reviewCardTitleContainer: { flexDirection: 'row', gap: 12 },
  reviewCardTitle: { fontSize: scaleFont(14), fontWeight: 600 },
  reviewCardDate: { fontSize: scaleFont(14), color: colors.light.gray },
  reviewCardMail: { fontSize: scaleFont(14) },
  addCartContainer: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(20),
    backgroundColor: colors.light.white,
    gap: moderateScale(4),
  },
  cartButton: {
    backgroundColor: colors.light.primary,
    borderRadius: moderateScale(8),
    paddingVertical: scaleHeight(14),
    alignItems: 'center',
  },
  cartButtonText: {
    color: colors.light.white,
    fontSize: scaleFont(16),
    fontWeight: '700',
  },
});
