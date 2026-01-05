import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native'; 
import { styles } from '../ProductDetail.styles';
import Rating from './Rating';
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
