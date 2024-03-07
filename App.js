import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import PressureScreen from "./src/screens/PressureScreen"; // Ensure this is the correct path

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Set a consistent background color for all screens
          cardStyle: { backgroundColor: "#1e1e1e" },
          // Custom transition effect
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pressures" component={PressureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
