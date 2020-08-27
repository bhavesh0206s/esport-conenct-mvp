import React, { useState, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
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
        <SearchBar focusTextInput={focusTextInput} textInput={textInput} />
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
      <Feather name="menu" size={29} onPress={openMenu} />
      <View style={{ flex: 1,flexDirection: 'row', justifyContent:'space-between' }}>
        <Text style={styles.headerText}>{title}</Text>
        {type === 'home' && (
          <View>
            <AntDesign
              name="search1"
              style={styles.searchIcon}
              size={24}
              color="black"
              onPress={() => navigation.navigate('Search')}
            />
          </View>
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
    color: 'black',
    letterSpacing: 1,
    paddingLeft: 17,
  },
  icon: {
    color: 'black',
  },
  logo: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
});

export default Header;