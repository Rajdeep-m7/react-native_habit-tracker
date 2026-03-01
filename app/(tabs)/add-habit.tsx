import { DATABASE_ID, databases, HABITS_COLLECTION } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View,  StyleSheet } from "react-native";
import { ID } from "react-native-appwrite";
import { Button,Text, SegmentedButtons, TextInput, useTheme } from "react-native-paper";

export default function addHabitScreen() {
  const FREQUENCIES = ["daily", "weekly", "monthly"];
  type Frequency = (typeof FREQUENCIES)[number];

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error , setError]= useState<string>("")
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme()

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          $createdAt: new Date().toISOString(),
        },
      );
      setDescription("");
      setTitle("")
      router.back();
    } catch (error) {
        if(error instanceof Error){
            setError(error.message)
            return
        }
        setError("something wrong in the add habit")
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        label="Title"
        mode="outlined"
        style={style.input}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={style.input}
        onChangeText={setDescription}
      />
      <View style={style.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button
        mode="contained"
        disabled={!title || !description}
        onPress={handleSubmit}
      >
        Add Habit
      </Button>
      {error ? <Text style={{color : theme.colors.error}}>{error}</Text>: null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    marginBottom: 80,
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 26,
  },
});
