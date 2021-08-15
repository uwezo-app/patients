import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Constants from 'expo-constants'
import axios from 'axios'
import SwipesBottomBar from '../components/SwipesBottomBar/SwipesBottomBar'
import Swipes from '../components/Swipes/Swipes'


export default function SwipeScreen() {
  const [users, setUsers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipesRef = useRef(null)

  async function fetchUsers() {
    try {
      const { data } = await axios.get('https://randomuser.me/api/?gender=female&results=50')
      setUsers(data.results)
    } catch (error) {
      console.log(error)
      Alert.alert('Error getting users', '', [{ text: 'Retry', onPress: () => fetchUsers() }])
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function handleLike() {
    console.log('like')
    nextUser()
  }

  function handlePass() {
    console.log('pass')
    nextUser()
  }

  function nextUser() {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
    setCurrentIndex(nextIndex)
  }

  function handleLikePress() {
    console.log("Pressed Like")
  }
  function handlePassPress() {
    console.log("Pressed Pass")
  }

  return (
    <View style={styles.container}>
      <View style={styles.swipes}>
        {users.length > 1 &&
          users.map(
            (u, i) =>
              currentIndex === i && (
                <Swipes
                  key={i}
                  ref={swipesRef}
                  currentIndex={currentIndex}
                  users={users}
                  handleLike={handleLike}
                  handlePass={handlePass}
                ></Swipes>
              )
          )}
      </View>
      <SwipesBottomBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})