import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { moderateScale, scaleHeight, scaleWidth } from '../../utils/scale';

export const styles = StyleSheet.create({
  maincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  container: {
    gap: moderateScale(10),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.light.lightGray,
    borderRadius: moderateScale(8),
    width: '100%',
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: colors.light.gray,
    marginTop: scaleHeight(20),
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  image: {
    resizeMode: 'contain',
    width: scaleWidth(120),
    height: scaleHeight(80),
    borderRadius: moderateScale(12),
  },
});
