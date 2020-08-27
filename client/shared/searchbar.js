import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { getEvents, fetchallEvents } from '../Redux/actions/event';
import { CLEARSEARCHEDEVENTS, CLEAR_PROFILES } from '../Redux/actions/types';
import { getProfiles } from '../Redux/actions/profile';

const SearchBar = ({ focusTextInput, textInput, type }) => {
  const dispatch = useDispatch();
  const [inputsearch, setInputSearch] = useState('');
  const [showCancelBtn, setShowCancelBtn] = useState(false);

  const handleCancel = () => {
    setInputSearch('');
    if(type==='register'){
      dispatch({ type: CLEAR_PROFILES });
    }else{
      dispatch({ type: CLEARSEARCHEDEVENTS });
    }
    setShowCancelBtn(false);
  };

  const handleTextChange = (val) => {
    setInputSearch(val);
    if(type === 'register'){
      dispatch(getProfiles(val));
    }else{
      dispatch(getEvents(val));
    }
    if (val.length > 0) {
      setShowCancelBtn(true);
    }else{
      handleCancel()
    }
  }

  return (
    <View style={styles.searchSection}>
      <TextInput
        ref={textInput}
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleTextChange}
        value={inputsearch}
      />
      {showCancelBtn && (
        <Icon
          onPress={handleCancel}
          name="clear"
          style={styles.searchIcon}
          size={24}
          color="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 4,
    borderBottomWidth: 0.7,
  },
});

export default SearchBar;
