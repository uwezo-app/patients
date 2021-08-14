import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryListItem from '../components/CategoryListItem';


import categories from '../data/Categories'

export default function Category() {
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width:'100%'}}
        data={categories} 
        renderItem={({item})=> <CategoryListItem categories={item}/>}
        keyExtractor={(item)=>item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
