/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Psychs:undefined;
  ChatRoom:undefined;
  Registration:undefined;
  Login:undefined;
  LandingPage:undefined;
  ProfileScreen:undefined;
  EditProfileScreen:undefined;
  PasswordReset:undefined;
  GetEmail:undefined;
  Swipe:undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Psychologists:undefined;
};

export type ChatParamList = {
  ChatScreen: undefined;
};

export type CategoryParamList = {
  Category: undefined;
};

export type User={
  id:String;
  name:String;
  imageUri:String;
  status:String;
}
export type Categories={
  id:String;
  imageUri:String;
  category:String;
}
export type Psychologists={
  id:String;
  name:String;
  imageUri:String;
  category:String;
}

export type Message={
  id: String;
  content:String;
  createdAt: String;
  user:User;
}

export type ChatRoom={
  id:String;
  users: User[];
 lastMessage:Message
}
