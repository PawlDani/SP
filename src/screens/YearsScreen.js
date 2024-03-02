import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "../utils/styles";
import supabase from "../services/supabaseClient";

export default function YearsScreen({ route, navigation }) {
  const { modelId } = route.params;
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("years")
          .select("*")
          .eq("model_id", modelId);
        if (error) throw error;
        setYears(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, [modelId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Year</Text>
      <FlatList
        data={years}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WeightInput", { yearId: item.id })
            }
          >
            <Text style={styles.cardText}>{item.year}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
