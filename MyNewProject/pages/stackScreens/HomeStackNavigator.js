import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Blog from "../components/Blog";

const Stack=createStackNavigator()


export default function HomeScreenStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Blog" component={Blog}/>
        </Stack.Navigator>
    )
}