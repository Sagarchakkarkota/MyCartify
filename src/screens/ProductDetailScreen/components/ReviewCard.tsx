import { View, Text } from 'react-native';
import React from 'react';
import Rating from './Rating';
import { moderateScale, scaleFont } from '../../../utils/scale';
import { colors } from '../../../theme/colors';
import { hexToRgba } from '../../../utils/hexToRgba.utility';
import { format } from 'date-fns';
import { styles } from '../ProductDetail.styles';
const ReviewCard = ({ reviewData }: { reviewData: any }) => {
  return (
    <View style={styles.reviewCardContainer}>
      <View style={styles.reviewCardTitleContainer}>
        <Rating productData={reviewData} />
        <Text style={styles.reviewCardTitle}>{reviewData?.reviewerName}</Text>
        <Text style={styles.reviewCardDate}>
          {format(new Date(reviewData?.date), 'dd MMM yyyy')}
        </Text>
      </View>
      <Text style={styles.reviewCardDate}>{reviewData?.comment}</Text>
      <Text style={styles.reviewCardMail}>{reviewData?.reviewerEmail}</Text>
    </View>
  );
};

export default ReviewCard;
