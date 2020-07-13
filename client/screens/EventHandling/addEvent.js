import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AddMyEvent} from '../../Redux/actions/event';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const eventSchema = yup.object({
  description: yup.string(),
  game: yup.string(),
  time: yup.date(),
  contact: yup.string(),
  title: yup.string(),
  prizepool: yup.number() /*.min(1)*/,
  entryFee: yup.number() /*.min(1)*/,
});

const AddEvent = ({setModalOpen, setOpenPopUp}) => {

  const dispatch = useDispatch();
  
  const [dateTime, setDateTime] = useState(new Date()) 
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [typeTourn, setTypeTourn] = useState('');

  const showDatepicker = () =>{
    setShow(true);
    setMode('date');
  }

  const showTimepicker = () =>{
    setMode('time')
    setShow(true);
  }

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShow(Platform.OS === 'ios');
    setDateTime(currentDate);
    console.log(currentDate)
    // showTimepicker()
  };

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <Formik
        initialValues={{
          description: '',
          game: '',
          time: new Date(),
          entryFee: '',
          prizepool: '',
          teamsize: '',
          title: '',
          contact: '',
        }}
        validationSchema={eventSchema}
        onSubmit={(values, actions) => {
          values.time = dateTime
          if(!values.entryFee){
            values.entryFee = 'FREE';
          }
          actions.resetForm();
          // dispatch(AddMyEvent(values));
          setModalOpen(false)
          setOpenPopUp(true)
        }}
      >
        {(formikprops) => (
          <View>
            <RNPickerSelect
              onValueChange={(value) => formikprops.setFieldValue('game', value)}
              items={[
                { label: 'PUBG', value: 'PUBG' },
                { label: 'COD', value: 'COD' },
                { label: 'Clash Royale', value: 'Clash Royale' },
              ]}
              placeholder={{
                label: 'Select a Game...',
                value: null,
                color: '#bec2bf'
              }}
            />         
            <Input
              placeholder="Tournament Name"
              onChangeText={formikprops.handleChange('title')}
              value={formikprops.values.title}
              onBlur={formikprops.handleBlur('title')}
              errorMessage={formikprops.touched.title && formikprops.errors.title}
            />
            <Input
              multiline
              placeholder="Game Description"
              onChangeText={formikprops.handleChange('description')}
              value={formikprops.values.description}
              onBlur={formikprops.handleBlur('description')}
              errorMessage={formikprops.touched.description && formikprops.errors.description}
            />
            <View>
            <View style={{flexDirection: 'row'}}>
              <Button onPress={showDatepicker} title="Select Date and Time" />
              <Button onPress={showTimepicker} title="Select Date and Time" />
            </View>
              {show && (
                <DateTimePicker
                  value={dateTime}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            <RNPickerSelect
              onValueChange={(value) => setTypeTourn(value)}
              items={[
                { label: 'FREE', value: 'Free' },
                { label: 'PAID', value: 'Paid' },
              ]}
              placeholder={{
                label: 'Type of Tournament...',
                value: null,
                color: '#bec2bf'
              }}
            />
            {typeTourn === 'Paid' ? (
              <Input
                placeholder="Entry Fees..."
                onChangeText={formikprops.handleChange('entryFee')}
                value={`${formikprops.values.entryFee}`}
                onBlur={formikprops.handleBlur('entryFee')}
                errorMessage={formikprops.touched.entryFee && formikprops.errors.entryFee}
              />
            ): null}    
            <Input
              placeholder="Prizepool..."
              onChangeText={formikprops.handleChange('prizepool')}
              value={`${formikprops.values.prizepool}`}
              onBlur={formikprops.handleBlur('prizepool')}
              errorMessage={formikprops.touched.prizepool && formikprops.errors.prizepool}
            />
            <RNPickerSelect
              onValueChange={(value) => formikprops.setFieldValue('teamsize', value)}
              items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
              placeholder={{
                label: 'Team Size...',
                value: null,
                color: '#bec2bf'
              }}
            />
            <Input
              multiline
              placeholder="Contact Number"
              onChangeText={formikprops.handleChange('contact')}
              value={formikprops.values.contact}
              onBlur={formikprops.handleBlur('contact')}
              errorMessage={formikprops.touched.contact && formikprops.errors.contact}
            />
            <Button onPress={formikprops.handleSubmit}  title="Submit For Verification" />
          </View>
        )}
      </Formik>
      
    </View>
  );
};

export default AddEvent;

