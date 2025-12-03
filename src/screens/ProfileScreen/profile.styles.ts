import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/scale';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: scaleHeight(30),
  },

  avatar: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: moderateScale(100),
    marginBottom: scaleHeight(10),
    elevation: 2,
  },

  name: {
    fontSize: scaleFont(22),
    fontWeight: '700',
    color: colors.light.black,
  },

  email: {
    fontSize: scaleFont(14),
    color: colors.light.gray,
    marginTop: scaleHeight(4),
  },

  card: {
    backgroundColor: colors.light.extraLightGray,
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: scaleHeight(20),
  },

  label: {
    fontSize: scaleFont(14),
    color: colors.light.gray,
  },

  value: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: colors.light.black,
    marginTop: scaleHeight(5),
  },

  buttons: {
    gap: moderateScale(12),
    marginTop: scaleHeight(10),
  },
});
