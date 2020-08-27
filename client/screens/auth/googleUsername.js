import React from 'react';
import { View, StyleSheet } from "react-native";
import { username } from '../../Redux/actions/auth';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Icon } from 'react-native-elements';
import Loading from '../../shared/loading';

const userNameSchema = yup.object({
  userName: yup.string().required().min(3),
  bio: yup.string().required(),
});

const GoogleUsername = ({route}) => {
  const {fromHost} = route.params;
  const {emailGoogle, loading} = useSelector((state) => ({
    emailGoogle: state.auth.email,
    loading: state.loading
  }));

  const dispatch = useDispatch();
  if(loading){
    return <Loading/>
  }else {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            userName: '',
            bio: '',
          }}
          validationSchema={userNameSchema}
          onSubmit={(values) => {
            dispatch(username(values.userName, values.bio, emailGoogle, fromHost));
          }}
        >
          {(formikprops) => (
            <View>
              <Input
                leftIcon={<Icon name="face" size={24} color="#4ecca3" />}
                style={styles.input}
                placeholder={'Unique Username...'}
                onChangeText={formikprops.handleChange('userName')}
                value={formikprops.values.userName}
                onBlur={formikprops.handleBlur('userName')}
                errorMessage={
                  formikprops.touched.userName && formikprops.errors.userName
                }
              />
              <Input
                style={styles.input}
                multiline
                placeholder={'Tell Us About You...'}
                onChangeText={formikprops.handleChange('bio')}
                value={formikprops.values.bio}
                onBlur={formikprops.handleBlur('bio')}
                errorMessage={formikprops.touched.bio && formikprops.errors.bio}
              />
              <Button buttonStyle={styles.button} onPress={formikprops.handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 40,
    width: 100,
    alignSelf: 'center',
    marginTop: 5,
  },
});
 
export default GoogleUsername;