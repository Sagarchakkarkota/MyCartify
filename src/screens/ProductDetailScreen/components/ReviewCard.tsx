import { View, Text } from 'react-native';
import React from 'react';
import Rating from './Rating';
import { moderateScale, scaleFont } from '../../../utils/scale';
import { colors } from '../../../theme/colors';

const ReviewCard = ({ reviewData }: { reviewData: any }) => {
  // {rating: 2, comment: 'Very disappointed!', date: '2025-04-30T09:41:02.053Z', reviewerName: 'Layla Young', reviewerEmail: 'layla.young@x.dummyjson.com'}
  return (
    <View
      style={{
        padding: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: colors.light.extraLightGray,
        gap: 4,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Rating productData={reviewData} />
        <Text style={{ fontSize: scaleFont(14), fontWeight: 600 }}>
          {reviewData?.reviewerName}
        </Text>
      </View>
      <Text style={{ fontSize: scaleFont(14) }}>{reviewData?.comment}</Text>
      <Text style={{ fontSize: scaleFont(14) }}>
        {reviewData?.reviewerEmail}
      </Text>
    </View>
  );
};

export default ReviewCard;
