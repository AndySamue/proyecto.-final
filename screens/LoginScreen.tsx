import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

export default function LoginScreen({ navigation }: any) {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')

  useEffect(() => {
    revisarToken();
  }, []);

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if( data.session != null){
      navigation.replace("Tabs")
      loginExitoso(data.session.access_token);
    }else{
      console.log(error)
      Alert.alert("Error", error?.message)
    }

  }

  // Biometria
   async function biometria() {
    const resultadoAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Pon tu huella dactilar",
      disableDeviceFallback: true
    });

    if (resultadoAuth.success) {
      console.log("Login biometrico exitoso");
      navigation.navigate("Tabs");
    } else {
      console.log("Error");
    }
  }

  // 1. Verificar si el token esta activo & guardar en una variable local
  async function loginExitoso(token: any) {
    await SecureStore.setItemAsync("token", token);
  }

  // 3. Pedir login biometrico solo si el token es válido
  async function revisarToken() {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      return false;
    }

    biometria();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresar correo electronico"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          onChangeText={setemail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setpassword}
        />

        <TouchableOpacity style={styles.button} onPress={()=>login()}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Registrar")}
      >
        <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
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

  link: {
    marginTop: 30,
    alignItems: "center",
  },

  linkText: {
    color: "#1E6091",
    fontSize: 15,
  },
});