// pages/screens/LoginScreen.js
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App'
import {serverOrigin} from '../constants/constants'
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const {toggleLogin,setUserData} =useContext(AuthContext)
  const handleLogin = () => {
    const fetchData=async()=>{
        try {

          const response=await axios.post(`http://${serverOrigin}:3000/login`,{
            email:email,
            password:password
          })  
   
          if(response.data.token){
            const {token,username,_id}=response.data
            AsyncStorage.setItem('NativeLoggedIn',JSON.stringify({token,username}))
            setUserData({token,username})
            toggleLogin()
          }
          else
            Alert.alert('not logged')
        } 
        catch(e){
            console.log(e)
            
            Alert.alert('error')
        }
    }
    fetchData()
    // if (username === 'user' && password === 'password') {
    //   navigation.navigate('Home'); // Navigate to Home screen on successful login
    // } else {
    //   alert('Invalid username or password');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
