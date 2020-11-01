import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  upadteProfile,
} from "../../../Redux/actions/profile";
import { Button, Input } from "react-native-elements";

const reviewSchema = yup.object({
  reviewText: yup.string(),
});

const EditMyReview = ({ modalHandler, reviewHandler, reviewPosted }) => {
  return (
    <View style={styles.content}>
      <Formik
        initialValues={{ reviewText: reviewPosted }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          reviewHandler(values.reviewText);
          modalHandler();
        }}
      >
        {(formikprops) => (
          <View>
            <View style={styles.commonStyleView}>
              <Input
                multiline
                // style={}
                label="reviewText"
                placeholder={reviewText ? reviewText : "Enter your review here"}
                onChangeText={formikprops.handleChange("reviewText")}
                value={formikprops.values.reviewText}
                onBlur={formikprops.handleBlur("reviewText")}
                errorMessage={
                  formikprops.touched.reviewText &&
                  formikprops.errors.reviewText
                }
              />
            </View>
            <Button onPress={formikprops.handleSubmit} title="Save" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    // backgroundColor: 'white',
    padding: 22,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  commonStyleView: {
    flexDirection: "row",
  },
});

export default EditMyReview;
