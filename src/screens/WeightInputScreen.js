import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../utils/styles";
import supabase from "../services/supabaseClient";

export default function WeightInputScreen({ route, navigation }) {
  const { yearId } = route.params;
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (!weight) {
      Alert.alert("Please enter your weight");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("pressures")
        .select("*")
        .eq("year_id", yearId)
        .lte("weight_min", weight)
        .gte("weight_max", weight);

      if (error) throw error;

      navigation.navigate("Results", { pressureData: data });
    } catch (error) {
      console.error(error);
      Alert.alert("Error fetching pressure data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter Your Weight</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Weight (kg)"
      />
      <Button title="Submit" onPress={handlePress} />
    </View>
  );
}
