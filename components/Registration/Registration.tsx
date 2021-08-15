import React, {useRef, useState}  from 'react';
import { Controller, useForm } from "react-hook-form";
import  styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import { FontAwesome, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';





interface FormData{
  UserName:string;
  Password:string;
  Cpassword:string;

}

export default function Registration() {
  const navigation =useNavigation();
    const {control,formState: { errors }, handleSubmit, getValues}= useForm<FormData>({
      defaultValues:{
        UserName: "",
        Password:"",
        Cpassword:""

      }
    });

     const[submitting, setSubmitting]= useState<boolean>(false);
     const [serverErrors, setServerErrors] = useState<Array<string>>([]);

      

    
    const onSubmit= async ({Cpassword,...rest}: FormData)=>{
          if(!submitting){
            setSubmitting(true);
            setServerErrors([]);

            const response=await fetch(
              `https://uwezoapp-321219.el.r.appspot.com/register`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json"
                },
                body:JSON.stringify({...rest}),
              }
            );
            const data= await response.json();

            if(data.status===201){
              navigation.navigate('Login');
            }else{
              console.log(data);
            }
          }
          setSubmitting(false);
          navigation.navigate('Login');
         
    }
     
    
    
     return(
      
<KeyboardAvoidingView style={styles.container}>
<Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>
          <Text style={{ alignSelf:'center', marginTop: 10, fontSize: 25}}>Register</Text>

       

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

     

  
     

      

     
   
    <View style={styles.action1}>
    <Fontisto name="user-secret" color={'black'} size={15} />
    <Controller
        control={control}
        rules={{
         required: true,
         minLength:{value: 8, message:"Must have at least 8 characters"},
         validate:(value: string)=>{
           return[/[A-Z]/,/[a-z]/,/[0-9]/,/[^a-zA-z0-9]/,].every((pattern)=>pattern.test(value))|| "Must have: lower, upper, number & special characters";
          }
         
        }}
        render={({ field: { onChange, onBlur } }) => (
          <TextInput placeholder="Password" style={styles.textInput} autoCompleteType="password" onChangeText={onChange} onBlur={onBlur} secureTextEntry={true}
          />
         )}
         name="Password" 
         defaultValue=""
        />
       
       
        </View>
        {errors.Password &&  <Text style={styles.forgot}> {errors.Password.message}</Text>}
      
   
   
    <View style={styles.action2}>
    <Fontisto name="user-secret" color={'black'} size={15} />
        <Controller
        control={control}
        rules={{
         required: true,
         validate: value => {
          if (value === getValues()["Password"]) {
            return true;
          } else {
            return "The passwords do not match";
          }
        }

        }}
        render={({ field: { onChange, onBlur } }) => (
          <TextInput placeholder="Confirm Password" style={styles.textInput} autoCompleteType="password" onChangeText={onChange} onBlur={onBlur} secureTextEntry={true}
          />
         )}
         name="Cpassword" 
         defaultValue=""
        />
       
        {errors.Cpassword &&  <Text >{errors.Cpassword.message}</Text>}
        
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      
        </KeyboardAvoidingView>
     
       
    );
}
