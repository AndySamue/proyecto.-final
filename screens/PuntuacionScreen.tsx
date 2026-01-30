import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export default function PuntuacionScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    cargarPuntuaciones();
  }, []);

  async function cargarPuntuaciones() {
    const { data, error } = await supabase
      .from('puntuaciones')
      .select('*')
      .order('puntos', { ascending: false })
      .limit(10);

    if (error) {
      console.log("Error cargando puntuaciones:", error);
    } else {
      setData(data || []);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Puntuaciones</Text>

      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Usuario</Text>
          <Text style={styles.headerText}>Puntos</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.user}>
                {index + 1}. {item.nombre}
              </Text>
              <Text style={styles.score}>{item.puntos}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#233D4D",
    textAlign: "center",
    marginBottom: 25,
  },
  table: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#233D4D",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F3F5",
  },
  user: {
    fontSize: 15,
    color: "#374151",
  },
  score: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#22c55e",
  },
});