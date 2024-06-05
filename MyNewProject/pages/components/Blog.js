import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import likeImg from '../assets/like.jpeg';
import commentImg from '../assets/comment.jpeg'
import axios from 'axios'
import { AuthContext } from '../../App'
import { useContext,useState } from 'react'
import { Alert } from 'react-native';
import {serverOrigin} from '../constants/constants'
export default function Blog({ title, _id, content,likes}) {
    const [likeCount, setLikes] = useState(likes);
    const {userData}=useContext(AuthContext)
    const likeEvent=async()=>{
        try {
            const response=await axios.post(`http://${serverOrigin}:3000/post/${_id}/like`,{
            token:userData.token,
            _id
        })
        if(response.status===200)
            Alert.alert('hello')
        else
            Alert.alert('sorry')
        } catch (error) {
            Alert.alert('error')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.bottom} >
            <TouchableOpacity onPress={likeEvent} style={styles.likeButton}>
                <Image source={likeImg} style={styles.likeImage} />
                 <Text>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.likeButton}>
                <Image source={commentImg} style={styles.likeImage} />
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    likeButton: {
        alignItems: 'center',
    },
    likeImage: {
        width: 30,
        height: 30,
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
});
