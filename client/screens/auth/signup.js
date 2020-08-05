import React, { useEffect, useState } from 'react';
import { Input, Button, Text, Overlay, Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { register } from '../../Redux/actions/auth';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import GoogleSignin from './GoogleSigin';
import { ScrollView } from 'react-native-gesture-handler';
import { createProfile } from '../../Redux/actions/profile';

const SignUp = ({ visible, setVisible, navigation }) => {
  const dispatch = useDispatch();

  const signUpSchema = yup.object({
    name: yup.string().required('Name is required.'),
    email: yup.string().required('Email is required.').email(),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords does not match'),
  });

  return (
    <Modal
      style={styles.overlay}
      isVisible={visible}
      backdropColor="#3e3f42"
      backdropOpacity={0.8}
      onBackButtonPress={() => setVisible(false)}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <GoogleSignin title="Sign Up With Google" navigation={navigation} />
        <View>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirm: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={async ({ name, email, password }) => {
              dispatch(register(name, email.toLowerCase(), password));
              navigation.navigate('UserName', {email: email.toLowerCase()})
              setVisible(false)
            }}
          >
            {(props) => (
              <View style={styles.content}>
                <Input
                  leftIcon={<Icon name="portrait" size={24} color="#4ecca3" />}
                  placeholder="Name"
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                  onBlur={props.handleBlur('name')}
                  errorMessage={props.touched.name && props.errors.name}
                />
                <Input
                  leftIcon={<Icon name="email" size={24} color="#4ecca3" />}
                  placeholder="Email"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
                  errorMessage={props.touched.email && props.errors.email}
                />
                <Input
                  leftIcon={<Icon name="lock" size={24} color="#4ecca3" />}
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  errorMessage={props.touched.password && props.errors.password}
                />
                <Input
                  leftIcon={<Icon name="lock" size={24} color="#4ecca3" />}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  onChangeText={props.handleChange('passwordConfirm')}
                  value={props.values.passwordConfirm}
                  onBlur={props.handleBlur('passwordConfirm')}
                  errorMessage={
                    props.touched.passwordConfirm &&
                    props.errors.passwordConfirm
                  }
                />
                <Button
                  title="Sign Up"
                  buttonStyle={styles.button}
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
  errorText: {
    marginTop: 0,
    color: 'crimson',
    textAlign: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    borderRadius: 20,
    width: 100,
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default SignUp;
