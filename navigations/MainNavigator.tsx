import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import RegisterSceen from "../screens/RegisterSceen";
import LoginScreen from "../screens/LoginScreen";
import GameScreen from "../screens/GameScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register" component={RegisterSceen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Game" component={GameScreen} />
    </Tab.Navigator>
  );
}

export default function MainNav() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
