import {  View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Text,Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { DATABASE_ID, databases, HABITS_COLLECTION } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { useEffect, useState } from "react";
import { Habit } from "@/types/databse.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const { signOut , user}=useAuth();
  const [habits , setHabits]= useState<Habit[]>();

  useEffect(()=>{
    fetchHabits();
  },[user])

  const fetchHabits=async()=>{
    try {
      const response= await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION,
        [Query.equal("user_id",user?.$id ?? "")]
      );   
      setHabits(response.documents as unknown as Habit[]);
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <View style={style.view}>
      <View>
        <Text>Today's Habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>Sign out</Button>
      </View>
    {habits?.length === 0 ? (
      <View><Text>No Habits yet, Add your first habit!</Text></View>
    ):(
      habits?.map((habit , key)=>
        <View key={key}>
          <Text>{habit.title}</Text>
          <Text>{habit.description}</Text>
          <View>
            <View><MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
            <Text>{habit.streak_count} day streak</Text>
            </View>
            <View>
              <Text>{habit.frequency.charAt(0).toUpperCase()+habit.frequency.slice(1)}</Text>
            </View>
          </View>
        </View>
      )
    )}
    </View>
  );
}

const style = StyleSheet.create({
  view: { flex: 1, justifyContent: "center", alignItems: "center" },
  navButton: {
    width: 100,
    height:20,
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center",
  },
});
