import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  card: {
    width: 150,
    marginHorizontal: 10,
    height: 150,
    backgroundColor: "lightgray",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
      },
    }),
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export { styles };
