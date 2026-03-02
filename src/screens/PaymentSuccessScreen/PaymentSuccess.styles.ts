import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(24),
  },

  iconContainer: {
    width: scaleWidth(110),
    height: scaleHeight(110),
    borderRadius: moderateScale(55),
    backgroundColor: colors.light.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(24),
  },

  title: {
    fontSize: scaleFont(22),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: scaleHeight(8),
    color: colors.light.black,
  },

  subtitle: {
    fontSize: scaleFont(14),
    color: colors.light.gray,
    marginTop: scaleHeight(8),
    textAlign: 'center',
    lineHeight: scaleHeight(20),
  },

  button: {
    marginTop: scaleHeight(32),
    backgroundColor: colors.light.success,
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(36),
    borderRadius: moderateScale(10),
    minWidth: scaleWidth(200),
  },

  buttonText: {
    color: colors.light.white,
    fontSize: scaleFont(16),
    fontWeight: '500',
    textAlign: 'center',
  },
});
