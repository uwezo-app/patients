import styles from "./styles";

import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import AuthContext from "../../context/auth/context";
import ButtonWithSpinner from "../ButtonWithSpinner/ButtonWithSpinner";

interface FormData {
  NickName: string;
  Password: string;
  Cpassword: string;
}

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      NickName: "",
      Password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const onSubmit = async ({ Cpassword, ...rest }: FormData) => {
    const authInfo = { ...rest };
    await authContext.login({
      isSubmitting,
      setIsSubmitting,
      setServerErrors,
      authInfo,
      navigation,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>

      <Text>
        {serverErrors.map((value, _) => {
          {
            value;
          }
        })}
      </Text>

      <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 25 }}>
        Login
      </Text>

      <View style={styles.action}>
        <Ionicons name="person" color={"black"} size={15} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your Nickname"
              style={styles.textInput}
              autoCompleteType="name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="NickName"
          defaultValue=""
        />

        {errors.NickName && <Text>Required</Text>}
      </View>

      <View style={styles.action}>
        <Fontisto name="user-secret" color={"black"} size={15} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              autoCompleteType="password"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={true}
              value={value}
            />
          )}
          name="Password"
          defaultValue=""
        />

        {errors.Password && <Text>Required</Text>}
      </View>

      <ButtonWithSpinner
        isSubmitting={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
export default Login;
