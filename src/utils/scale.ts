import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
export const scaleWidth = (size: number) => (width / BASE_WIDTH) * size;
export const scaleHeight = (size: number) => (height / BASE_HEIGHT) * size;
export const scaleFont = (size: number) => size * PixelRatio.getFontScale();
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;
