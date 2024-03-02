import React from "react";
import { Pressable, Text, StyleSheet, Platform } from "react-native";

const Button = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
      },
    }),
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Button;
