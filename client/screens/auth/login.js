import React, { useEffect, useState } from 'react';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { login } from '../../Redux/actions/auth';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import SignUp from './signup';
import GoogleSignin from './GoogleSigin';


const LoginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required('No password provided.'),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <GoogleSignin title="Sign In With Google" navigation={navigation} />
      <SignUp
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async ({ email, password }) => {
          dispatch(login(email.toLowerCase(), password));
          // if (isAuthenticated) navigation.navigate('Home');
        }}
      >
        {(props) => (
          <View>
            <Input
              leftIcon={<Icon name="email" size={24} color="#4ecca3" />}
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
              errorMessage={props.touched.email && props.errors.email}
            />

            <Input
              leftIcon={<Icon name="lock" size={24} color="#4ecca3" />}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              onBlur={props.handleBlur('password')}
              errorMessage={props.touched.password && props.errors.password}
            />
            <Button
              title="Sign In"
              buttonStyle={styles.button}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text
            onPress={toggleOverlay}
            style={{ color: '#4ecca3', fontSize: 20 }}
          >
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default Login;
