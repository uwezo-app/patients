import React from 'react';
import { Text,View,Image,TouchableWithoutFeedback } from 'react-native';
import { Categories } from '../../types';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export type CategoryListItemProps={
    categories : Categories;
}

const CategoryListItem= (props: CategoryListItemProps)=>{
    const {categories}= props;
    const navigation =useNavigation();

    const onClick=()=>{
        navigation.navigate('Psychs')
    }
   
  return(
      <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
          <View style={styles.leftContainer}>
          <Image source={{uri: categories.imageUri}} style={styles.avatar}/>
          
          <View style={styles.midContainer}>
          <Text style={styles.username}>{categories.category} </Text>
          </View>
          </View>
      
      </View>
      </TouchableWithoutFeedback>
  )
};

export default CategoryListItem;