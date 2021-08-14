import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PsychsListItem from '../components/PsychsListItem';


import psychologists from '../data/Psychologists'

export default function Psychologists() {
  return (
    <View style={styles.container}>
      <FlatList 
      style={{width:'100%'}}
        data={psychologists } 
        renderItem={({item})=> <PsychsListItem psychologists={item}/>}
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
