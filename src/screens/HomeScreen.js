import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../utils/styles";
import Button from "../components/Button";
import supabase from "../services/supabaseClient";

export default function HomeScreen({ navigation }) {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("makes").select("*");
        if (error) throw error;
        setMakes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Make</Text>
      <View style={styles.cardContainer}>
        {makes.map((make) => (
          <TouchableOpacity
            key={make.id}
            onPress={() => navigation.navigate("Types", { makeId: make.id })}
          >
            <View style={styles.card}>
              <Text style={styles.cardText}>{make.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
