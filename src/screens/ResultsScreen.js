import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResultsScreen({ route }) {
  const { pressureData } = route.params;

  const pressure =
    pressureData.length > 0 ? pressureData[0].pressure : "No data available";

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recommended Pressure</Text>
      <View style={styles.content}>
        <Text style={styles.pressureText}>{pressure}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    width: "100%",
    alignItems: "center",
  },
  pressureText: {
    fontSize: 18,
    color: "navy",
    textAlign: "center",
  },
});
