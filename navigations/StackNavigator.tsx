import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterSceen from "../screens/RegisterSceen";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack =  createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Iniciar Sesión" component={LoginScreen}/>
            <Stack.Screen name="Registrar" component={RegisterSceen}/>
        </Stack.Navigator>
    )
}

export default function StackNav() {
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}