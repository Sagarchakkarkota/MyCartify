import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { moderateScale, scaleHeight } from '../../utils/scale';

export const styles = StyleSheet.create({
  maincontainer: { justifyContent: 'center' },
  container: {
    gap: moderateScale(10),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.light.lightGray,
    borderRadius: moderateScale(8),
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: colors.light.gray,
    marginTop: scaleHeight(20),
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
});
