import React from 'react'
import { StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeableImage from '../SwipeableImage/SwipeableImage'



function Swipes(myProp: { users: { [x: string]: any }; currentIndex: number; swipesRef: React.LegacyRef<Swipeable> | undefined; handleLike: () => void; handlePass: () => void }) {
  
  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={myProp.users[myProp.currentIndex + 1]} ></SwipeableImage>
      </RectButton>
    )
  }
  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={myProp.users[myProp.currentIndex + 1]} ></SwipeableImage>
      </RectButton>
    )
  }

  return (
    <Swipeable
      ref={myProp.swipesRef}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        myProp.handleLike()
      }}
      onSwipeableRightOpen={() => {
        myProp.handlePass()
      }}
    
    >
      <SwipeableImage user={myProp.users[myProp.currentIndex]} />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.forwardRef((props, ref) => <Swipes swipesRef={ref} {...props} ></Swipes>)