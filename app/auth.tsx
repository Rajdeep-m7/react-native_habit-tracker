import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { Button, Text,
  TextInput,} from "react-native-paper"

export default function AuthScreen() {
  const[isSignUp , setIsSignUp]= useState<boolean>(false);
  const handleSwitchMode=()=>{
    setIsSignUp((prev)=> !prev)
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>{isSignUp ?"create Account" : "Welcome Back"}</Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          mode="outlined"
        />
        <Button mode="contained">{isSignUp ?"Sign Up" : "Sign In"}</Button>
        <Button mode="text" onPress={handleSwitchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account ? Sign Up"}</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
