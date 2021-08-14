import React from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import { Psychologists } from '../../types';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export type PsychsListItemProps={
    psychologists : Psychologists;
}

const PsychsListItem= (props: PsychsListItemProps)=>{
    const {psychologists}= props;
   
    const navigation =useNavigation();

    const onClick=()=>{
        navigation.navigate('Swipes')
    }
   
  return(
      <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={{uri: psychologists.imageUri}} style={styles.avatar}/>
            
            <View style={styles.midContainer}>
                <Text style={styles.username}>{psychologists.name} </Text>            
            </View>
           
          </View>
                         

      </View>
      </TouchableWithoutFeedback>
  )
};

export default PsychsListItem;