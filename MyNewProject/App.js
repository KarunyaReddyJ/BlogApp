import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/screens/HomeScreen';
import ProfileScreen from './pages/screens/ProfileScreen';
import PostScreen from './pages/screens/PostScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AuthContext = createContext();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    token: '',
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const logged = await AsyncStorage.getItem('NativeLoggedIn');
      if (!logged) return false;
      const userDataFromStorage = JSON.parse(logged);
      setUserData(userDataFromStorage);
      setLoggedIn(true);
    };
    checkLoggedIn();
  }, []);

  const Tab = createBottomTabNavigator();
  const toggleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ loggedIn, toggleLogin, userData, setUserData }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Blogs') {
                iconName = 'rss';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ea',
            tabBarInactiveTintColor: '#a3a3a3',
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarStyle: styles.tabBar,
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              headerTitle: (props) => <Text style={styles.headerTitle}>Home</Text>,
              headerStyle: styles.header,
            }}
          />
          <Tab.Screen 
            name="Blogs" 
            component={PostScreen} 
            options={{ 
              headerTitle: (props) => <Text style={styles.headerTitle}>Blogs</Text>,
              headerStyle: styles.header,
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ 
              headerTitle: (props) => <Text style={styles.headerTitle}>Profile</Text>,
              headerStyle: styles.header,
              tabBarIcon: ({ color, size }) => (
                <Icon name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    backgroundColor: '#9f9f9f',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
