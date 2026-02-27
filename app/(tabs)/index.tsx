import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={style.view}>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        hiii
      </Text>
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
