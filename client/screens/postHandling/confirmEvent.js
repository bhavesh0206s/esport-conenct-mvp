import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { modal } from '../../Redux/actions/modal';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

const ConfirmEvent = ({route}) => {
  const { info } = route.params
  const {description, game, time, entryFee, prizepool, teamsize, title, contact} = info;
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.goBack();
            dispatch(modal(true)); 
          }}
        />
      )
    })
  }, [navigation]);

  return(
    <View>
      <Text>{game}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{time}</Text>
      <Text>{entryFee}</Text>
      <Text>{prizepool}</Text>
      <Text>{teamsize}</Text>
      <Text>{contact}</Text>

      <Button onPress={() =>{ dispatch(modal(true)); navigation.goBack()}} title='press' />
    </View>
  )
}

export default ConfirmEvent;