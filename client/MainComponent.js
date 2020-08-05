import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import { View, Platform, KeyboardAvoidingView} from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import { useSelector, useDispatch } from 'react-redux';
import DrawerStack from './routes/drawerStack';
import Alert from './shared/alert';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from './Redux/setAuthToken';
import { loadUser, logout } from './Redux/actions/auth';
import { getCurrentProfile } from './Redux/actions/profile';
import { Button } from 'react-native-elements';

const MainComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isUserNameVerified = auth.isUserNameVerified;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        dispatch(loadUser());
        dispatch(getCurrentProfile());
      }
      setTimeout(() => {
        setIsReady(true);
      }, 500);
      // await AsyncStorage.removeItem('token');
    };
    userLoad();
    console.log('Maincomponent page refreshed');
  }, []);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <Alert />
          {(!isAuthenticated && !isUserNameVerified )? <AuthStack /> : <DrawerStack />}
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
