import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { getEvents } from '../Redux/actions/event';
import { CLEARSEARCHEDEVENTS } from '../Redux/actions/types';

const SearchBar = ({ focusTextInput, textInput }) => {
  const dispatch = useDispatch();
  const [inputsearch, setInputSearch] = useState('');
  const [showCancelBtn, setShowCancelBtn] = useState(false);

  const handleCancel = () => {
    setInputSearch('');
    dispatch({ type: CLEARSEARCHEDEVENTS });
    setShowCancelBtn(false);
  };

  return (
    <View style={styles.searchSection}>
      <AntDesign
        name="search1"
        style={styles.searchIcon}
        size={24}
        color="black"
      />
      <TextInput
        ref={textInput}
        style={styles.input}
        placeholder="Search..."
        onChangeText={(val) => {
          setInputSearch(val);
          dispatch(getEvents(val));
          if (inputsearch.length > 0) {
            setShowCancelBtn(true);
          }
        }}
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
