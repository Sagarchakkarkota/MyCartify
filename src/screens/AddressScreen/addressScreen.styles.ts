import { StyleSheet } from 'react-native';
import { moderateScale, scaleFont, scaleHeight } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: { padding: moderateScale(16) },
  title: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginBottom: scaleHeight(15),
  },
});
