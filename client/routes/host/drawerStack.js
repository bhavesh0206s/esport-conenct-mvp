import React, { useState }  from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './mainStack';
import AboutStack from './otherStack/aboutStack';
import { Button, Avatar } from 'react-native-elements';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loadUser } from '../../Redux/actions/auth';
import Loading from '../../shared/loading';
import { getCurrentProfile } from '../../Redux/actions/profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ConfirmModal from '../../shared/confirmModal';

const Drawer = createDrawerNavigator();

const LogoutContentComponent = (props) => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.profile);
  const [modalOpen, setModalOpen] = useState(false);

  if (!profileInfo.userProfile) {
    if (!profileInfo.userProfile) {
      dispatch(getCurrentProfile());
    }
    return <Loading />;
  } else {
    return (
      <DrawerContentScrollView {...props}>
        <ConfirmModal
          text='Do you really want to Sign Out...' 
          setModalOpen={setModalOpen} 
          modalOpen={modalOpen} 
          handleOk={() => dispatch(logout())}
        />
        <DrawerItem
          label=""
          icon={() => {
            return (
              <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginLeft: 24,
                  }}
                >
                  <Avatar
                    size={50}
                    rounded
                    overlayContainerStyle={{ backgroundColor: 'black' }}
                    icon={{ name: 'user', type: 'font-awesome-5' }}
                    activeOpacity={1}
                    containerStyle={{
                      margin: 5,
                    }}
                  />
                  <Text style={{ fontSize: 17, paddingLeft: 4 }}>
                    {profileInfo.userProfile.name || ''}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginHorizontal: 70 }}
          label=""
          onPress={() => {
            props.navigation.navigate('Home');
          }}
          icon={() => (
            <Button
              icon={
                <AntDesign
                  name="logout"
                  style={{ marginHorizontal: 5 }}
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{ padding: 10, paddingHorizontal: 20 }}
              title="Sign Out"
              onPress={() => {
                setModalOpen(true)
              }}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  }
};


export default function HostDrawerStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <LogoutContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="About" component={AboutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}