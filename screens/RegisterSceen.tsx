import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "../supabase/config";

export default function RegisterScreen() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function validarCampos() {
    if (
      name.trim() === "" ||
      user.trim() === "" ||
      password.trim() === "" ||
      confirmPass.trim() === ""
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }

    if (age < 5 || isNaN(age)) {
      Alert.alert("Error", "Edad mínima 5 años");
      return false;
    }

    if (password !== confirmPass) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  }

  async function guardarRegister() {
    if (!validarCampos()) return;

    const { error } = await supabase.from("register").insert({
      user: user,
      name: name,
      age: age,
      password: password,
      confirmpass: confirmPass,
    });

    if (error) {
      Alert.alert("Error", "No se pudo registrar el usuario");
    } else {
      Alert.alert("Éxito", "Usuario registrado correctamente");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#A0A0A0"
          onChangeText={setName}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu edad"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          onChangeText={(t) => setAge(+t)}
        />

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu usuario"
          placeholderTextColor="#A0A0A0"
          onChangeText={setUser}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirmar contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirma tu contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.button} onPress={guardarRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
    paddingBottom: 80,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#233D4D",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  label: {
    fontSize: 14,
    color: "#233D4D",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#233D4D",
    borderRadius: 14,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});