import React, { useState, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getProfiles } from '../Redux/actions/profile';
import SearchBar from './searchbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Header = ({ navigation, title, type }) => {
  const dispatch = useDispatch();

  const openMenu = () => {
    navigation.openDrawer();
  };

  const textInput = useRef();

  const focusTextInput = () => textInput.current.focus();

  if (type === 'Search' ) {
    return (
      <View style={styles.header}>
        <SearchBar textInput={textInput} />
      </View>
    );
  }

  if (type === 'Search') {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    );
  }

  if (type === 'EventDetailsCard') {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    );
  }

  if(type === 'confirmEvent' || type === 'editProfile' || type==='myEventDetails' || type==='userProfile'){
    return (
        <View>
          <Text style={styles.headerText}>{title}</Text>
        </View>
    );
  }
  if(type === 'register'){
    return (
      <View style={styles.header}>
        <SearchBar type={type} focusTextInput={focusTextInput} textInput={textInput} />
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <Feather name="menu" size={29} onPress={openMenu} color='#4ecca3' />
      <View style={{ flex: 1,flexDirection: 'row', justifyContent:'space-between' }}>
        {type === 'home' || type === 'home-host' ? (
          <View style={styles.imageContainer}>
            <Image style={styles.stretch} source={require('../assets/splash.png')}/>
          </View>
        ): (
          <Text style={styles.headerText}>{title}</Text>
        )}
        {type === 'home' && (
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <AntDesign
              name="search1"
              style={styles.searchIcon}
              size={24}
              color="#4ecca3"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 21,
    color: '#4ecca3',
    letterSpacing: 1,
    paddingLeft: 17,
  },
  icon: {
    color: '#4ecca3',
  },
  logo: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
  imageContainer :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  stretch: {
    position: 'absolute',
    width: 70,
    height: 35,
    paddingTop: 10,
    resizeMode: 'stretch',
  },
});

export default Header;