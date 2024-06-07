import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export default function BlogSmall({ title, _id, created, author, navigation }) {
    // Function to truncate the created date to first 10 characters
     const dateCreated = created.slice(0, 10);
    const timeCreated=created.slice(11,8)
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Blog',{blogId:_id}) } style={styles.card}>
            <View style={{flexDirection:'row'}} >
            <Text style={styles.author}> {author || '' } </Text>
             <Text> {author ? 'wrote':''} </Text></View>
            <Text style={styles.title}> {title  || 'title' } </Text>
            <Text style={styles.created}> {dateCreated} </Text>
            <Text style={styles.created}> {timeCreated} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor:'#ffff' ,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    created: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    author: {
        fontSize: 14,
        fontWeight:'700',
        color: 'red',
        textDecorationLine:'underline'
    },
});
