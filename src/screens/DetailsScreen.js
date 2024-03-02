import React from "react";
import { View, Text } from "react-native";
import { styles } from "../utils/styles";
import Button from "../components/Button";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
