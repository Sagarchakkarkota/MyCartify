import { colors } from './colors';
import { moderateScale } from '../utils/scale';
import { hexToRgba } from '../utils/hexToRgba.utility';

export const shadows = {
  card: {
    shadowColor: hexToRgba(colors.light.primary, 0.2),
    shadowRadius: moderateScale(4),
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
};
