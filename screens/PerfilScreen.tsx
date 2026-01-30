import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase/config";
import * as SecureStore from "expo-secure-store";

export default function PerfilScreen({ navigation }: any) {
  const [user, setuser] = useState({} as usuario);

  type usuario = {
    name: String;
    age: number;
    email: String;
  };

  useEffect(() => {
    leerUsuario();
  }, []);

  async function leerUsuario() {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user.id) {
      datosUsuarios(data.session.user.id);
    }
  }

  async function datosUsuarios(uid: any) {
    const { data } = await supabase
      .from("usuarios")
      .select()
      .eq("uid", uid);

    if (data && data.length > 0) {
      setuser(data[0]);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("Welcome");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.card}>
        <Ionicons
          name="person-circle-outline"
          size={90}
          color="#233D4D"
          style={styles.icon}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.value}>{user.age} años</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("Editar")}
        >
          <Text style={styles.editText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    paddingVertical: 35,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
    marginBottom: 80,
  },
  icon: {
    marginBottom: 25,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    color: "#6C757D",
  },
  value: {
    fontSize: 15,
    color: "#233D4D",
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#1E6091",
    borderRadius: 14,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: "#ef4444",
    borderRadius: 14,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
