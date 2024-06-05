// pages/screens/RegisterScreen.js
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../App'
import {serverOrigin} from '../constants/constants'
const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {toggleLogin,setUserData}=useContext(AuthContext)
  const handleRegister = () => {
    // Simulate registration logic (replace with actual logic to register with backend)
    const register=async()=>{
      try {
        const response=await axios.post(`http://${serverOrigin}:3000/register`,{
          username,
          email,
          password
        })
        if(response.data.token){
          const {token,username}=response.data
          setUserData({token,username})
          toggleLogin()
          Alert.alert('success')
        }
        else
          Alert.alert('not logged')
        
      } catch (error) {
        Alert.alert('error while registering')
      }
    }
    register()
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
