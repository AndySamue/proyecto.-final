import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PerfilScreen from "../screens/PerfilScreen";
import GameScreen from "../screens/GameScreen";
import PuntuacionScreen from "../screens/PuntuacionScreen";

const Tab = createBottomTabNavigator();

export default function GameNav(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Game" component={GameScreen}/>
            <Tab.Screen name="Perfil" component={PerfilScreen}/>
            <Tab.Screen name="Score" component={PuntuacionScreen}/> 
        </Tab.Navigator>
    )
}