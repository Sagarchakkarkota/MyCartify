import { scaleFont } from '../utils/scale';

export const typography = {
  regular: {
    fontSize: scaleFont(14),
    fontWeight: '400' as const,
  },
  medium: {
    fontSize: scaleFont(16),
    fontWeight: '500' as const,
  },
  large: {
    fontSize: scaleFont(20),
    fontWeight: '600' as const,
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: '700' as const,
  },
};
