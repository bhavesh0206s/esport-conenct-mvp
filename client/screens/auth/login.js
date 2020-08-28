import React, { useEffect, useState } from 'react';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { login } from '../../Redux/actions/auth';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import SignUp from './signup';
import GoogleSignin from './GoogleSigin';
import Loading from '../../shared/loading';

const LoginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required('No password provided.'),
});

const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {fromHost} = route.params;
  const { auth, loading } = useSelector((state) => ({
    auth: state.auth,
    loading: state.loading
  }));
  
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  if(loading){
    return <Loading/>
  }else{
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.stretch} source={require('../../assets/splash.png')}/>
          </View>
          <Text style={styles.text} >{fromHost ? 'WELCOME HOST!' : 'WELCOME PLAYER!'}</Text>
          <GoogleSignin googleBtnStyle={styles.btnStyle} fromHost={fromHost} title="Sign In With Google" navigation={navigation} />
        {/* <SignUp
          visible={visible}
          setVisible={setVisible}
          navigation={navigation}
        />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async ({ email, password }) => {
            dispatch(login(email.toLowerCase(), password));
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
        </View> */}
        </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 40,
    marginVertical: 40,
    width: 100,
    alignSelf: 'center',
    marginTop: 5,
  },
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
  stretch: {
    width: 300,
    height: 150,
    resizeMode: 'stretch',
  },
  text:{
    marginTop: 70,
    fontSize: 30
  },
  btnContainer:{
    flexDirection: 'row',
    margin: 10
  },
  btnStyle:{
    padding: 15,
    paddingHorizontal: 30,
    margin: 10,
    marginTop: 30
  }
});

export default Login;
