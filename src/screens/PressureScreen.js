import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import supabase from "../services/supabaseClient";

function PressureScreen({ route, navigation }) {
  const { selectedYear, weight } = route.params;

  const [pressure, setPressure] = useState("");
  const [softPressure, setSoftPressure] = useState("");
  const [hardPressure, setHardPressure] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressure = async () => {
      const startTime = Date.now();

      try {
        const { data, error } = await supabase
          .from("pressures")
          .select("*")
          .eq("year_id", selectedYear)
          .lte("weight_min", weight)
          .gte("weight_max", weight);

        if (error) throw error;

        if (data.length === 0) {
          setPressure("No pressure data available.");
        } else {
          const normalPressure = data[0].pressure;
          setPressure(normalPressure);
          setSoftPressure(parseFloat(normalPressure) - 10 + " psi");
          setHardPressure(parseFloat(normalPressure) + 10 + " psi");
        }
      } catch (error) {
        console.error("Error fetching pressure data", error);
        setPressure("Error fetching pressure data.");
      } finally {
        const endTime = Date.now();
        const fetchDuration = endTime - startTime;

        const minLoadingTime = 500;

        if (fetchDuration < minLoadingTime) {
          setTimeout(() => {
            setLoading(false);
          }, minLoadingTime - fetchDuration);
        } else {
          setLoading(false);
        }
      }
    };

    fetchPressure();
  }, [selectedYear, weight]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#D1A628" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity>
          <Image
            source={require("/Users/Daniel/Documents/CodersLab/SP/assets/logobg.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Suggested Pressure Settings</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Soft</Text>
              <Text style={styles.tableCell}>Normal</Text>
              <Text style={styles.tableCell}>Hard</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{softPressure}</Text>
              <Text style={styles.tableCell}>{pressure}</Text>
              <Text style={styles.tableCell}>{hardPressure}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },

  upperContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },

  logoImage: {
    width: 180,
    height: 180,
  },

  title: {
    fontSize: 25,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    padding: 10,
    width: "100%",
  },

  contentWrapper: {
    flex: 0.7,
  },

  content: {
    alignItems: "center",
    fontSize: 25,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    borderColor: "#FDC830",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 100,
  },

  table: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  tableCell: {
    color: "#ffffff",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },

  pressure: {
    fontSize: 25,
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
  },

  buttonContainer: {
    paddingBottom: 50,
  },

  button: {
    width: 250,
    padding: 12,
    backgroundColor: "#D1A628",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PressureScreen;
