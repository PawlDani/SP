import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native";
import supabase from "../services/supabaseClient";

export default function HomeScreen({ navigation }) {
  const [allMakes, setAllMakes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [allPressures, setAllPressures] = useState([]);

  const [makes, setMakes] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [weight, setWeight] = useState("");
  const [pressure, setPressure] = useState("");

  const [loading, setLoading] = useState(true);

  const clearInputs = () => {
    setSelectedMake("");
    setSelectedType("");
    setSelectedModel("");
    setSelectedYear("");
    setWeight("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const makeRes = await supabase.from("makes").select("*");
        setAllMakes(makeRes.data);

        const typeRes = await supabase.from("types").select("*");
        setAllTypes(typeRes.data);

        const modelRes = await supabase.from("models").select("*");
        setAllModels(modelRes.data);

        const yearRes = await supabase.from("years").select("*");
        setAllYears(yearRes.data);

        const pressureRes = await supabase.from("pressures").select("*");
        setAllPressures(pressureRes.data);

        // set the makes and types for initial dropdowns
        setMakes(
          makeRes.data.map((make) => ({
            label: make.name,
            value: make.id.toString(),
          }))
        );
        setTypes(
          typeRes.data.map((type) => ({
            label: type.name,
            value: type.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data", error);
        Alert.alert("Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMake && selectedType) {
      setSelectedModel("");

      const filteredModels = allModels.filter(
        (model) =>
          model.make_id === parseInt(selectedMake, 10) &&
          model.type_id === parseInt(selectedType, 10)
      );

      setModels(
        filteredModels.map((model) => ({
          label: model.name,
          value: model.id.toString(),
        }))
      );
    } else {
      setModels([]);
    }
  }, [selectedMake, selectedType, allModels]);

  useEffect(() => {
    if (selectedModel) {
      setSelectedYear("");
      const filteredYears = allYears.filter(
        (year) => year.model_id.toString() === selectedModel
      );
      setYears(
        filteredYears.map((year) => ({
          label: year.year.toString(),
          value: year.id.toString(),
        }))
      );
    } else {
      setYears([]);
    }
  }, [selectedModel, allYears]);

  // Function to submit weight if year is selected
  const handleSubmit = async () => {
    if (!selectedYear || weight.trim() === "") {
      Alert.alert("Please enter all the information.");
      return;
    }

    navigation.navigate("Pressures", { selectedYear, weight });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.upperContainer}>
        <TouchableOpacity onPress={clearInputs}>
          <Image
            source={require("/Users/Daniel/Documents/CodersLab/SP/assets/logobg.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedMake(value)}
          items={allMakes.map((make) => ({
            label: make.name,
            value: make.id.toString(),
          }))}
          value={selectedMake}
          style={pickerSelectStyles}
          placeholder={{ label: "Select a make", value: "" }}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          useNativeAndroidPickerStyle={false}
          darkTheme={true}
        />

        <RNPickerSelect
          onValueChange={(value) => setSelectedType(value)}
          items={allTypes.map((type) => ({
            label: type.name,
            value: type.id.toString(),
          }))}
          value={selectedType}
          style={pickerSelectStyles}
          placeholder={{ label: "Select a type", value: "" }}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          disabled={!selectedMake}
          useNativeAndroidPickerStyle={false}
          darkTheme={true}
        />

        <RNPickerSelect
          onValueChange={(value) => setSelectedModel(value)}
          items={models}
          value={selectedModel}
          style={pickerSelectStyles}
          placeholder={{ label: "Select a model", value: null }}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          disabled={!selectedType || models.length === 0}
          useNativeAndroidPickerStyle={false}
          darkTheme={true}
        />

        <RNPickerSelect
          onValueChange={(value) => setSelectedYear(value)}
          items={years}
          value={selectedYear}
          style={pickerSelectStyles}
          placeholder={{ label: "Select a year", value: null }}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          disabled={selectedModel === "" || years.length === 0}
          useNativeAndroidPickerStyle={false}
          darkTheme={true}
        />

        <TextInput
          style={{ ...styles.input, color: "#ffffff" }}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Your weight (kg)"
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          editable={selectedYear !== ""}
          disabled={selectedYear === ""}
        />
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
          disabled={!selectedYear}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
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

  formContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },

  submitContainer: {
    paddingBottom: 50,
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: 250,
    padding: 12,
    textAlign: "center",
    borderColor: "#FDC830",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
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

  pressureText: {
    fontSize: 20,
    width: 300,
    textAlign: "center",
    color: "#ffffff",
    paddingBottom: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FDC830",
    borderRadius: 10,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    width: 250,
    fontSize: 20,
  },

  inputAndroid: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#FDC830",
    borderRadius: 10,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12,
    width: 250,
  },
});
