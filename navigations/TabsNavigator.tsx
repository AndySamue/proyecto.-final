import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome, Entypo } from "@expo/vector-icons";
import GameScreen from "../screens/GameScreen";
import PerfilScreen from "../screens/PerfilScreen";
import PuntuacionScreen from "../screens/PuntuacionScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#233D4D",
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },
        tabBarActiveTintColor: "#F5FBE6",
        tabBarInactiveTintColor: "#215E61",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Juego"
        component={GameScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="game-controller" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Puntuación"
        component={PuntuacionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="trophy" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
