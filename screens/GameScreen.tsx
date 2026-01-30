import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { supabase } from "../supabase/config";

export default function GameScreen({ navigation }: any) {
  const [puntaje, setPuntaje] = useState(0);
  const [tiempo, setTiempo] = useState(10);
  const [juego, setJuego] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let temporizador: any;

    if (juego && tiempo > 0) {
      temporizador = setInterval(() => {
        setTiempo((prev) => prev - 1);
      }, 1000);
    }

    if (tiempo === 0) {
      setJuego(false);
      guardarPuntuacion();
    }

    return () => clearInterval(temporizador);
  }, [juego, tiempo]);

   useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function iniciar() {
    setPuntaje(0);
    setTiempo(10);
    setJuego(true);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/click.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function puntos() {
    if (juego) {
      setPuntaje((prev) => prev + 1);
      await playSound();
    }
  }

  async function guardarPuntuacion() {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session?.user.id) {
      console.log("Error obteniendo sesión");
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('name')
      .eq('uid', sessionData.session.user.id)
      .single();

    if (userError || !userData) {
      console.log("Error obteniendo usuario");
      return;
    }

    const { error } = await supabase
      .from('puntuaciones')
      .insert({
        uid: sessionData.session.user.id,
        nombre: userData.name,
        puntos: puntaje
      });

    if (error) {
      console.log("Error guardando puntuación:", error);
    } else {
      console.log("Puntuación guardada exitosamente");
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>TapRush</Text>

      <View style={styles.card}>
        <Ionicons name="flash" size={70} color="#FF9D23" style={styles.icon} />

        <Text style={styles.text}>⏱ Tiempo: {tiempo}</Text>
        <Text style={styles.text}>🎯 Puntos: {puntaje}</Text>

        {juego ? (
          <TouchableOpacity style={styles.tapArea} onPress={puntos}>
            <Text style={styles.tapText}>TOCAR</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={iniciar}>
            <Text style={styles.buttonText}>
              {tiempo === 0 ? "Reintentar" : "Iniciar"}
            </Text>
          </TouchableOpacity>
        )}
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
  logout: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
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
  text: {
    fontSize: 16,
    color: "#6C757D",
    marginBottom: 10,
    fontWeight: "500",
  },
  tapArea: {
    marginTop: 25,
    backgroundColor: "#22c55e",
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  tapText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#233D4D",
    borderRadius: 14,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});