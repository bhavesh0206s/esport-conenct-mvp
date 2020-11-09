import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-elements'
import Modal from 'react-native-modal';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Formik } from "formik";
import * as yup from "yup";
import { postReview } from '../Redux/actions/event';
import { useDispatch } from 'react-redux';

const reviewSchema = yup.object({
  reviewText: yup.string(),
  rating: yup.number(),
});

const ReviewModal = ({openReviewModal, toggleOverlay, hostId, eventId }) => {

  const dispatch = useDispatch();
  const [rating, setRating] = useState(3);

  return (
    <Modal
      animationIn="bounceIn"
      backdropOpacity={0.8}
      onSwipeComplete={toggleOverlay}
      swipeDirection={['up', 'left', 'right', 'down']}
      isVisible={openReviewModal}
      onBackButtonPress={toggleOverlay}
      style={styles.overLay}
      onBackdropPress={toggleOverlay}
    >
      <View style={styles.content}>
        <Formik
          validationSchema={reviewSchema}
          initialValues={{ reviewText: '',rating: ''}}
          onSubmit={(values) => {
            values.rating = rating;
            dispatch(postReview({values, hostId, eventId}));
            toggleOverlay();
          }}
        >
          {(formikprops) => (
            <View>
              <View style={styles.ratingView}>
                <AirbnbRating 
                  onFinishRating={(r) => setRating(r)}
                  reviewColor='#4ecca3'
                  selectedColor='#4ecca3'
                />
              </View>
              <View style={styles.commonStyleView}>
                <Input
                  multiline
                  label="Review"
                  placeholder={formikprops.values.reviewText ? formikprops.values.reviewText : "Enter your review here"}
                  onChangeText={formikprops.handleChange("reviewText")}
                  value={formikprops.values.reviewText}
                  onBlur={formikprops.handleBlur("reviewText")}
                  errorMessage={
                    formikprops.touched.reviewText &&
                    formikprops.errors.reviewText
                  }
                />
              </View>
              <View style={styles.btnContainer}>
                <View style={styles.btnView}>
                  <Button 
                    titleStyle={{color: '#fff'}}  
                    buttonStyle={styles.btnCancel}
                    title='CANCEL'
                    icon={<MaterialCommunityIcons name="cancel" size={24} color='#fff' />}
                    onPress={toggleOverlay}   
                  />
                </View>
                <View style={styles.btnView}>
                  <Button 
                    buttonStyle={styles.btnOk} 
                    icon={<AntDesign name="checkcircleo" size={24} color="#fff" />}
                    title='SAVE'
                    onPress={formikprops.handleSubmit}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#393e46',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    textAlign:'center',
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    flex: 1,
  },
  btnOk:{
    borderRadius: 0,
    backgroundColor: '#4ecca3'
  },
  btnCancel:{
    borderRadius: 0,
    backgroundColor: '#d9534f'
  },
  ratingView:{
    padding: 20,
  }
});

export default ReviewModal;
