import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { View, Platform, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AddMyEvent} from '../../Redux/actions/event';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const eventSchema = yup.object({
  description: yup.string().required(),
  game: yup.string().required(),
  time: yup.string().required(),
  contact: yup.string().required(),
  title: yup.string().required(),
  prizepool: yup.number().required(),
  entryFee: yup.number().required(),
});

const AddEvent = ({setModalOpen, setOpenPopUp, hostEvent}) => {

  const navigation = useNavigation();
  
  const [typeTourn, setTypeTourn] = useState('');
  
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
          time: '',
          entryFee: '',
          prizepool: '',
          teamsize: '',
          title: '',
          contact: '',
        }}
        validationSchema={eventSchema}
        onSubmit={(values, actions) => {
          let currentDatetime = moment(values.time, "DD-MM-YYYY hh:mm:ss");
          values.time = currentDatetime;
          if(!values.entryFee){
            values.entryFee = 'FREE';
          }
          navigation.navigate('Confirm Event', {info: values})
          // actions.resetForm();
          // dispatch(AddMyEvent(values));
          setModalOpen()
          
          // setOpenPopUp(true)
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
            <Input
              placeholder={"Date Time: DD-MM-YYYY hh:mm"}
              onChangeText={formikprops.handleChange('time')}
              value={formikprops.values.time}
              onBlur={formikprops.handleBlur('time')}
              errorMessage={formikprops.touched.time && formikprops.errors.time}
            />
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
              placeholder='Prizepool..'
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

