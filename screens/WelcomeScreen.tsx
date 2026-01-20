import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TapRush</Text>

      <View style={styles.card}>
        <Ionicons name="flash" size={90} color="#FF9D23" style={styles.icon} />

        <Text style={styles.description}>
          Da toques lo más rápido que puedas y supera tu mejor puntuación.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Iniciar Sesión")}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#233D4D",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
    marginBottom:100
  },

  icon: {
    marginBottom: 35,
  },

  button: {
    backgroundColor: "#233D4D",
    borderRadius: 14,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  description: {
    fontSize: 15,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 25,
  },
});
