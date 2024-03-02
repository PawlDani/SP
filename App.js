import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import ModelsScreen from "./src/screens/ModelsScreen";
import YearsScreen from "./src/screens/YearsScreen";
import TypesScreen from "./src/screens/TypesScreen";
import WeightInputScreen from "./src/screens/WeightInputScreen";
import ResultsScreen from "./src/screens/ResultsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Types" component={TypesScreen} />
        <Stack.Screen name="Models" component={ModelsScreen} />
        <Stack.Screen name="Years" component={YearsScreen} />
        <Stack.Screen name="WeightInput" component={WeightInputScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
