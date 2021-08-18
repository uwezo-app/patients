import React, {useState}  from 'react';
import { Controller, useForm } from "react-hook-form";
import styles from'./styles'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity,Text, View, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Fontisto, Ionicons } from '@expo/vector-icons';





interface FormData{
  UserName:string;
  Password:string;
  Cpassword:string;
  

}

const Login = () => {
 
  
    const { control,formState: { errors }, handleSubmit}= useForm({
      defaultValues:{
        UserName: "",
        Password:""
      }
    });

     const[submitting, setSubmitting]= useState<boolean>(false);
     const [serverErrors, setServerErrors] = useState<Array<string>>([]);
     const navigation =useNavigation();

    
    
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

        if(data.status===200){
          navigation.navigate('Root');
        }else{
          console.log(" UserName or Password is Incorrect");
         
        }
      }
      setSubmitting(false);
      navigation.navigate('Root');
}
    
     
    
    
     return(
           
  <View style={styles.container}>
         <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>

         
         
        
     <Text style={{ alignSelf:'center', marginTop: 10, fontSize: 25}}>Login</Text>
       
     
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

    
     <View style={styles.action}>
    <Fontisto name="user-secret" color={'black'} size={15} />
    <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Password" style={styles.textInput} autoCompleteType="password" onChangeText={onChange} onBlur={onBlur} secureTextEntry={true}
          />
         )}
         name="Password" 
         defaultValue=""
        />
       
        {errors.Password &&  <Text>Required</Text>}
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>


        
      
      </View>
  
 
    );
}
export default Login;