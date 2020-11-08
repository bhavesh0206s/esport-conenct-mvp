import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-elements'
import Modal from 'react-native-modal';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
  reviewText: yup.string(),
});

const ReviewModal = ({openReviewModal, toggleOverlay, modalHandler, reviewHandler, reviewPosted }) => {

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
        <View style={styles.ratingView}>
          <AirbnbRating 
            // starStyle={}
          />
        </View>
        <Formik
          validationSchema={reviewSchema}
          initialValues={{ reviewText: ''}}
          onSubmit={(values) => {
            // reviewHandler(values.reviewText);
            // modalHandler();
          }}
        >
          {(formikprops) => (
            <View>
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
