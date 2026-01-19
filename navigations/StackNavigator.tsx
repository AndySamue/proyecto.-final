import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterSceen from "../screens/RegisterSceen";
import { NavigationContainer } from "@react-navigation/native";

const Stack =  createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
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