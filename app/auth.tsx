import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text,
  TextInput, useTheme 
  } from "react-native-paper"

export default function AuthScreen() {
  const[isSignUp , setIsSignUp]= useState<boolean>(false);
  const[email , setEmail]= useState<string>("");
  const[password , setPassword]= useState<string>("");
  const [error , setError]= useState<string | null>("")
  const theme = useTheme();
  const router = useRouter();

  const {signIn , signUp}= useAuth();

  const  handleAuth=async()=>{
    if(!email || !password){
      setError("Please fill in all fields.");
      return;
    }
    if(password.length < 6){
      setError("Password length must be 6 character long");
      return;
    }

    setError(null)

    if(isSignUp){
      const error=await signUp(email , password)
      if(error){
        setError(error)
        return
      }
    }else{
      const error=await signIn(email , password)
      if(error){
        setError(error)
        return
      }
      router.replace("/")
    }
  }
  const handleSwitchMode=()=>{
    setIsSignUp((prev)=> !prev)
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View style={style.content}>
        <Text style={style.title}>{isSignUp ?"Create Account" : "Welcome Back"}</Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={style.input}
          outlineStyle={{ borderRadius: 10 }}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={style.input}
          outlineStyle={{ borderRadius: 10 }}
          onChangeText={setPassword}
        />
        {error ? <Text style={{color : theme.colors.error}}>{error}</Text>: null}
        <Button style={style.button} onPress={handleAuth} mode="contained">{isSignUp ?"Sign Up" : "Sign In"}</Button>
        <Button style={style.switchButton} mode="text" onPress={handleSwitchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account ? Sign Up"}</Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content:{
    flex: 1,
    padding:16,
    justifyContent:"center",
  },
  title:{
    fontSize:20,
    textAlign:"center",
    marginBottom: 10,
    fontWeight: "bold"
  },
  button:{
    marginTop:18,
    padding:2
  },
  input :{
    marginTop:8,
    borderRadius: 30
  },
  switchButton : {
    marginTop:5
  }
})