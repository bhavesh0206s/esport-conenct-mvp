import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { upadteHostProfile } from '../../../Redux/actions/profile';
import { Button, Input } from 'react-native-elements';

const profileSchema = yup.object({
  bio: yup.string(),
  gameinterest: yup.string(),
});

const EditProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  
  const myProfileiInfo = useSelector((state) => state.profile.userProfile);
  const { bio } = myProfileiInfo;

  return (
    <View style={styles.content}>
      <Formik
        initialValues={{ bio }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          dispatch(upadteHostProfile(values));
          navigation.goBack();
        }}
      >
        {(formikprops) => (
          <View>
            <Input
              multiline
              placeholder={bio ? bio : 'Your Bio'}
              onChangeText={formikprops.handleChange('bio')}
              value={formikprops.values.bio}
              onBlur={formikprops.handleBlur('bio')}
              errorMessage={formikprops.touched.bio && formikprops.errors.bio}
            />
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
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default EditProfile;
