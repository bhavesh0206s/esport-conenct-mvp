import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { likeHandler } from '../../Redux/actions/post';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Posts = ({ item}) => {

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.myprofile.user);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (
      item[0].likes.filter((like) => like.user === user).length > 0 &&
      !like
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  return (
    <Card 
      containerStyle={styles.card}
    >
      <View style={{ flexDirection: 'row', marginVertical: 4 }}>
      <Avatar
        size={35}
        rounded
        overlayContainerStyle={{ backgroundColor: 'black' }}
        icon={{ name: 'user', type: 'font-awesome-5' }}
        // onPress={() => navigation.navigate('')}
        activeOpacity={1}
        containerStyle={{
          marginHorizontal: 2,
        }}
      />
      <View style={{ justifyContent: 'center', marginLeft: 5 }}>
        <Text style={{ fontSize: 19 }}>{item[0].name}</Text>
      </View>
    </View>

      <Text style={{paddingVertical: 10, paddingLeft: 6, fontSize: 15}}>
        {item[0].text}
      </Text>
      <Text  style={{paddingLeft: 6, fontWeight:'bold'}}>
        {item[0].likes.length>1 ? `${item[0].likes.length} likes`: `${item[0].likes.length} like`}
      </Text>
      <View style={styles.btnContent}>
        <Button
          icon={<Icon name='favorite' color={like ? 'red': '#68696b'} />}
          onPress={() => {
            dispatch(likeHandler(item[0]._id, true));
          }}
          buttonStyle={styles.btnStyle}
          title='Like' 
          type='clear'
          titleStyle={{padding: 5, color: 'grey'}}
        />
        <Button
          icon={<Icon name='comment' color='black' />}
          buttonStyle={styles.btnStyle}
          title='Comment' 
          type='clear'
          titleStyle={{padding: 5, color: 'grey'}}
        />
        <Button
          icon={<Icon name='share' color='black' />}
          buttonStyle={styles.btnStyle}
          title='Share' 
          type='clear' 
          titleStyle={{padding: 5, color: 'grey'}} 
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 10,
  },
  btnContent:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: 'white'
  }
})

export default Posts;
