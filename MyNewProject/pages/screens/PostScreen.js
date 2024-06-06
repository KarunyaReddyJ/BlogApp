import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../App'
import {serverOrigin} from '../constants/constants'
export default function AddPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {userData}=useContext(AuthContext)
    const handleSubmit = async () => {
        try {
             
            const response = await axios.post(`http://${serverOrigin}:3000/post/create`, {
                title,
                content,
                token:userData.token
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Post created successfully');
                setTitle('');
                setContent('');
            } else if(response.status === 401) {
                Alert.alert('Login First', 'Failed to create post');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while creating the post');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />
            <Text style={styles.label}>Content</Text>
            <TextInput
                style={{...styles.input,height:400}}
                value={content}
                onChangeText={setContent}
                placeholder="Enter content"
                multiline
                textAlignVertical='top'
            />
            <Button title="Add Post" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
