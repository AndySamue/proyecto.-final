import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterSceen from "../screens/RegisterSceen";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyTabs from "./TabsNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Iniciar Sesión" component={LoginScreen} />
      <Stack.Screen name="Registrar" component={RegisterSceen} />
      <Stack.Screen name="Tabs" component={MyTabs}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function StackNav() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
