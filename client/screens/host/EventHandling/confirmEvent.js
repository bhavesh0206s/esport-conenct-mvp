import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { modal } from '../../../Redux/actions/modal';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import VerifyModel from './verifyModel';
import { AddMyEvent } from '../../../Redux/actions/event';
import { ScrollView } from 'react-native-gesture-handler';

const ConfirmEvent = ({route}) => {
  const { info } = route.params;
  const {description, game, time, entryFee, prizepool, teamsize, title, contact} = info;
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleSubmit = () =>{
    setOpenPopUp(true)
    dispatch(AddMyEvent(info))
    console.log('event Added..........')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.goBack();
            if(openPopUp){
              dispatch(modal(false)); 
            }else{
              dispatch(modal(true)); 
            }
          }}
        />
      )
    })
  }, [navigation]);

  return(
    <ScrollView>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Selected Game:</Text>
          <Text style={styles.field}>{game}</Text>
        </View>
        <View>
          <Text style={styles.title}>Tournment Name:</Text>
          <Text style={styles.field}>{title}</Text>
        </View>
        <View>
          <Text style={styles.title}>Game Description:</Text>
          <Text style={styles.field}>{description}</Text>
        </View>
        <View>
          <Text style={styles.title}>Date and Time:</Text>
          <Text style={styles.field}>{time.toString()}</Text>
        </View>
        <View>
          <Text style={styles.title}>Entry Fee:</Text>
          <Text style={styles.field}>{entryFee}</Text>
        </View>
        <View>
          <Text style={styles.title}>Prizepool:</Text>
          <Text style={styles.field}>{prizepool}</Text>
        </View>
        <View>
          <Text style={styles.title}>Team Size:</Text>
          <Text style={styles.field}>{teamsize}</Text>
        </View>
        <View>
          <Text style={styles.title}>Contact Number:</Text>
          <Text style={styles.field}>{contact}</Text>
        </View>
        <View style={styles.btnView}>
          <Button buttonStyle={{...styles.btnStyle, backgroundColor: '#d9534f'}} onPress={() =>{ dispatch(modal(true)); navigation.goBack()}} title='Cancel' />
          <Button buttonStyle={styles.btnStyle} onPress={handleSubmit} title='Submit' />
        </View>
        <VerifyModel openPopUp={openPopUp} navigation={navigation} setOpenPopUp={setOpenPopUp}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnView : {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle:{
    marginTop: 20,
    paddingHorizontal: 20,
  },  
  content: {
    margin: 25
  },
  title: {
    color: '#95bdb5',
    fontSize: 16,
    marginTop: 10,
  },
  field: {
    padding: 5,
    fontSize: 17,
    color: '#eeeeee'
  }
})

export default ConfirmEvent;

