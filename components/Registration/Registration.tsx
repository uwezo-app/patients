import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import AuthContext from "../../context/auth/context";
import ButtonWithSpinner from "../ButtonWithSpinner/ButtonWithSpinner";

interface FormData {
  NickName: string;
  Password: string;
  Cpassword: string;
}

export default function Registration() {
  const navigation = useNavigation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      NickName: "",
      Password: "",
      Cpassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const authContext = React.useContext(AuthContext);

  const onSubmit = async ({ Cpassword, ...rest }: FormData) => {
    const body = { ...rest };

    await authContext.register({
      navigation,
      isSubmitting,
      setIsSubmitting,
      setServerErrors,
      body,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
        Register
      </Text>

      <View style={styles.action}>
        <Ionicons name="person" color={"black"} size={15} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Set a NickName"
              style={styles.textInput}
              autoCompleteType="name"
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="NickName"
          defaultValue=""
        />

        {errors.NickName && <Text>Required</Text>}
      </View>

      <View style={styles.action1}>
        <Fontisto name="user-secret" color={"black"} size={15} />
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: { value: 8, message: "Must have at least 8 characters" },
            validate: (value: string) => {
              return (
                [/[A-Z]/, /[a-z]/, /[0-9]/, /[^a-zA-z0-9]/].every((pattern) =>
                  pattern.test(value)
                ) || "Must have: lower, upper, number & special characters"
              );
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              autoCompleteType="password"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={true}
            />
          )}
          name="Password"
          defaultValue=""
        />
      </View>
      {errors.Password && (
        <Text style={styles.forgot}> {errors.Password.message}</Text>
      )}

      <View style={styles.action2}>
        <Fontisto name="user-secret" color={"black"} size={15} />
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              if (value === getValues()["Password"]) {
                return true;
              } else {
                return "The passwords do not match";
              }
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Confirm Password"
              style={styles.textInput}
              autoCompleteType="password"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={true}
            />
          )}
          name="Cpassword"
          defaultValue=""
        />

        {errors.Cpassword && <Text>{errors.Cpassword.message}</Text>}
      </View>

      <ButtonWithSpinner
        isSubmitting={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </KeyboardAvoidingView>
  );
}
