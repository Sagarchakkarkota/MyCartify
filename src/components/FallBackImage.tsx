import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { scaleHeight, scaleWidth } from '../utils/scale';

const FallBackImage = ({ url }: { url: any }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={url} resizeMode="contain" />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: scaleWidth(300),
    height: scaleHeight(300),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FallBackImage;
