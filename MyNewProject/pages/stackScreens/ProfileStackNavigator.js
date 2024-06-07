import { createStackNavigator } from "@react-navigation/stack"
const Stack=createStackNavigator()
import Profile from "../components/Profile"
import Blog from '../components/Blog'
export default function ProfileStackScreen(){
    return(
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Blog" component={Blog} />
        </Stack.Navigator>
    )
}