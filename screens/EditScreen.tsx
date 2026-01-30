import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase/config";

export default function EditScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(5);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    const { data: usuario } = await supabase
      .from("usuarios")
      .select()
      .eq("uid", data.user.id)
      .single();

    if (usuario) {
      setName(usuario.name);
      setAge(usuario.age);
      setEmail(usuario.email);
    }
  }

  function validarCampos() {
    if (name.trim() === "" || email.trim() === "") {
      Alert.alert("Error", "Nombre y correo son obligatorios");
      return false;
    }

    if (age < 5 || isNaN(age)) {
      Alert.alert("Error", "Edad mínima 5 años");
      return false;
    }

    if (password !== "") {
      if (password.length < 6) {
        Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
        return false;
      }

      if (password !== confirmPass) {
        Alert.alert("Error", "Las contraseñas no coinciden");
        return false;
      }
    }

    return true;
  }

  async function guardarCambios() {
    if (!validarCampos()) return;

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      Alert.alert("Error", "Usuario no autenticado");
      return;
    }

    const uid = data.user.id;

    const { error } = await supabase
      .from("usuarios")
      .update({
        name: name,
        age: age,
        email: email,
      })
      .eq("uid", uid);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    if (password !== "") {
      const { error: passError } = await supabase.auth.updateUser({
        password: password,
      });

      if (passError) {
        Alert.alert("Error", passError.message);
        return;
      }
    }

    Alert.alert("Éxito", "Perfil actualizado correctamente");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.card}>
        <Ionicons
          name="create-outline"
          size={80}
          color="#233D4D"
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={age.toString()}
          onChangeText={(texto) => setAge(+texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña (opcional)"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#233D4D",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  icon: {
    alignSelf: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: "#233D4D",
  },

  button: {
    backgroundColor: "#233D4D",
    borderRadius: 14,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
