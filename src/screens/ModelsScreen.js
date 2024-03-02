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

export default function ModelsScreen({ route, navigation }) {
  const { makeId, typeId } = route.params;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("models")
          .select("*")
          .eq("make_id", makeId)
          .eq("type_id", typeId);
        if (error) throw error;
        setModels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [makeId, typeId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Model</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Years", { modelId: item.id })}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
