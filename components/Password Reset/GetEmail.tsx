import React, {useState}  from 'react';
import { Controller, useForm } from "react-hook-form";
import styles from'./styles'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity,Text, View, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons} from '@expo/vector-icons';





interface FormData{
  UserName:string;
 }

const GetEmail = () => {
  const navigation =useNavigation();
  const onClick=()=>{
    navigation.navigate('PasswordReset')
 }
    const { control,formState: { errors }, handleSubmit}= useForm({
      defaultValues:{
        UserName: "",
      }
    });

     const[submitting, setSubmitting]= useState<boolean>(false);
      
    
     const onSubmit= async ({UserName}: FormData)=>{
      if(!submitting){
        setSubmitting(true);
        setServerErrors([]);

        const response=await fetch(
          `https://uwezoapp-321219.el.r.appspot.com`,{
            method:"POST",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({UserName}),
          }
        );
        const data= await response.json();

        if(data.status===200){
          navigation.navigate('Root');
        }else{
          console.log(" Username or Password is Incorrect");
         
        }
      }
      setSubmitting(false);
      navigation.navigate('PasswordReset');
}
    
     
    
    
     return(
           
  <View style={styles.container}>
         <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>

         
         
        
     <Text style={{ alignSelf:'center', marginTop: 70, fontSize: 15}}></Text>
       
     
     <View style={styles.action}>
       <Ionicons name="person" color={'black'} size={15} />
       <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <TextInput placeholder="Set a Username" style={styles.textInput} autoCompleteType="name" onChangeText={onChange} onBlur={onBlur}
          />
         )}
         name="UserName" 
         defaultValue=""
        />
       
        {errors.UserName &&  <Text>Required</Text>}
</View> 


        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>

      </View>
  
 
    );
}
export default GetEmail;

function setServerErrors(arg0: never[]) {
  throw new Error('Function not implemented.');
}
