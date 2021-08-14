import React  from 'react';
import { FlatList,View } from 'react-native';
import {useRoute} from '@react-navigation/native'
import chatRoomData from '../data/Chats'
import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';


const ChatRoomScreen=()=> {

    const route =useRoute();
    console.log(route.params)
    
    return(
     
        <><FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessage message={item}
          inverted />} /><View style={{}}>
          <InputBox />
        </View></>
        
       
    );
}

export default ChatRoomScreen;
