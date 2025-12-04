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
    padding: moderateScale(16),
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    marginBottom: scaleHeight(16),
  },
  card: {
    backgroundColor: colors.light.white,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: scaleHeight(16),
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: scaleHeight(6),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleHeight(6),
    width: '30%',
  },
  radio: {
    width: scaleWidth(20),
    height: scaleHeight(20),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.light.border,
    marginRight: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  radioLabel: {
    fontSize: scaleFont(16),
  },
});
