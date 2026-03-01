import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Surface } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import {
  client,
  DATABASE_ID,
  databases,
  HABITS_COLLECTION,
} from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { useCallback, useState } from "react";
import { Habit } from "@/types/databse.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION,
        [Query.equal("user_id", user?.$id ?? "")],
      );
      setHabits(response.documents as unknown as Habit[]);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!user?.$id) return;
      fetchHabits();
    }, [user?.$id]),
  );

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text variant="headlineSmall" style={style.title}>
          Today's Habits
        </Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign out
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
      {habits?.length === 0 ? (
        <View style={style.emptyState}>
          <Text style={style.emptyStateText}>
            No Habits yet, Add your first habit!
          </Text>
        </View>
      ) : (
        habits?.map((habit) => (
          <Surface key={habit.$id} style={style.card} elevation={0}>
            <View style={style.cardContent}>
              <Text style={style.cardTitle}>{habit.title}</Text>
              <Text style={style.cardDescription}>{habit.description}</Text>
              <View style={style.cardFooter}>
                <View style={style.streakBadge}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={18}
                    color={"#ff9800"}
                  />
                  <Text style={style.streakText}>
                    {habit.streak_count} day streak
                  </Text>
                </View>
                <View style={style.frequencyBadge}>
                  <Text style={style.frequencyText}>
                    {habit.frequency.charAt(0).toUpperCase() +
                      habit.frequency.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </Surface>
        ))
      )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7edff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#f0c9ff",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#6934fe",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
  },
});
