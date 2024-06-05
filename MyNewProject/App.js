import { StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './pages/screens/HomeScreen';
import ProfileScreen from './pages/screens/ProfileScreen';
import PostScreen from './pages/screens/PostScreen';
import { NavigationContainer } from '@react-navigation/native';
import {useState,createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext=createContext()
import Icon from 'react-native-vector-icons/FontAwesome'; 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(()=>checkLoggedIn());
  const [userData, setUserData] = useState({
    username:'',
    token:'',
    
  });
  async function checkLoggedIn(){
    const logged=await  AsyncStorage.getItem('NativeLoggedIn')
    if(!logged)
      return false
    const userDataFromStorage = JSON.parse(logged);
    setUserData(userDataFromStorage);
    return true
  }
  const Tab=createBottomTabNavigator()
  const toggleLogin=()=>{
    setLoggedIn(!loggedIn)
  }
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{loggedIn,toggleLogin,userData,setUserData}}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home'; // Example icon names from FontAwesome
            } else if (route.name === 'Blogs') {
              iconName = focused ? 'rss' : 'rss';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }

            // You can return any component here that you like. Here we use FontAwesome icons.
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'magenta', // Color of the active tab label and icon
          inactiveTintColor: 'gray', // Color of inactive tab labels and icons
          labelStyle: { fontSize: 16, fontWeight: 'bold' }, // Style for tab labels
          style: { backgroundColor: '#f2f2f2', borderTopWidth: 1, borderTopColor: '#ccc' }, // Style for the tab bar
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Blogs" component={PostScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="square" size={size} color={color} /> // Custom icon for Profile tab
            ),
          }}
        />
      </Tab.Navigator>
    </AuthContext.Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
