import {Text,View,StyleSheet} from 'react-native'
import LoginScreen from '../components/Login'
import RegisterScreen from '../components/Register'
import Profile from '../components/Profile'
import { AuthContext } from '../../App'
import { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
export default function ProfileScreen(){
    const {loggedIn}=useContext(AuthContext)
    const Tabs=createMaterialTopTabNavigator()
    return(
        <View style={styles.container} >
            
                {
                    loggedIn?
                    <GestureHandlerRootView>
                        <ScrollView>
                        <Profile/>
                        </ScrollView>
                    </GestureHandlerRootView>
                    :
                    <Tabs.Navigator>
                        <Tabs.Screen 
                        name="Login"
                         component={LoginScreen}/>
                        <Tabs.Screen
                         name="Register"
                          component={RegisterScreen}/>
                    </Tabs.Navigator>
                    
                }
           
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})