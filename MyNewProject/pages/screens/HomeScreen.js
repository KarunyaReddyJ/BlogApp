import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../../App';
import axios from 'axios';
import Blog from '../components/BlogSmall';
import { serverOrigin } from '../constants/constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`http://${serverOrigin}:3000/post`);
        if (response.data) {
          setPosts(response.data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  const renderItem = ({ item }) => (
    <Blog
      // content={item.content}
      key={item._id}
      _id={item._id}
      title={item.title}
      // likes={item.likes.length}
      created={item.createdAt}
      author={item.author}
      navigation={navigation}
    />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    padding: 10,
  },
});
