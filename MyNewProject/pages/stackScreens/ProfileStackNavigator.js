import { createStackNavigator } from "@react-navigation/stack"
const Stack=createStackNavigator()
import Profile from "../components/Profile"
import Blog from '../components/Blog'
import LoginScreen from "../components/Login"
import { AuthContext } from '../../App'
import { useContext } from 'react'
export default function ProfileStackScreen(){
    const {loggedIn}=useContext(AuthContext)
    if(!loggedIn)
        return( <LoginScreen/>)
    return(
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Blog" component={Blog} />
        </Stack.Navigator>
    )
}