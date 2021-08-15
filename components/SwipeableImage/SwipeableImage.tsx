import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'


export default function SwipeableImage(myProps:{ user: any }) {
  return (
    <View>
       <Image source={{uri: myProps.user.imageUri}} style={styles.photo}/>
      
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Ionicons name="person" size={20} color="black"></Ionicons>
          <Text style={styles.textPrimary}>{myProps.user.name.first}</Text>
        </View>
        <View style={styles.textRow}>
          <MaterialIcons name="description" size={20} color="black"></MaterialIcons>
          <Text style={styles.textSecondary}>{myProps.user.location.city}</Text>
        </View>
      </View>
    </View>
  )
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderWidth: 3,
  borderRadius: 10,
}

const styles = StyleSheet.create({
  
  photo: {
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor:'black'
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'green',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textSecondary: {
    color: 'black',
    marginLeft: 10,
    fontSize: 20,
  },
 
})