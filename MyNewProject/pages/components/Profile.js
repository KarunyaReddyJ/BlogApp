import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import from expo-image-picker
import axios from 'axios';
import { AuthContext } from '../../App';
import { serverOrigin } from '../constants/constants';
import Blog from './Blog';
import userImg from '../assets/user.jpeg';

export default function Profile() {
    const { userData, toggleLogin } = useContext(AuthContext);
    const [myBlogs, setMyBlogs] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.post(`http://${serverOrigin}:3000/detail`, {
                    token: userData.token
                });
                if (response.status === 200) {
                    setMyBlogs(response.data.blogs);
                }
            } catch (error) {
                Alert.alert('Error fetching details');
            }
        };
        fetchDetails();
    }, []);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access media library is required');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setProfileImage(pickerResult.uri);
            uploadImage(pickerResult);
        }
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('profileImage', {
            uri: image.uri,
            type: 'image/jpeg', // Assuming JPEG format
            name: 'profile.jpg', // Sample file name
        });

        try {
            Alert.alert('started')
            const response = await axios.post(`http://${serverOrigin}:3000/upload-profile-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userData.token}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Profile image uploaded successfully');
            } else {
                Alert.alert('Failed to upload profile image');
            }
        } catch (error) {
            Alert.alert('Error uploading image');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <TouchableOpacity onPress={handleImagePick}>
                    <Image source={profileImage ? { uri: profileImage } : userImg} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={styles.username}>{userData.username}</Text>
            </View>
            <Button title='Logout' onPress={toggleLogin} />
            {
                myBlogs.map((task) => (
                    <Blog
                        content={task.content}
                        key={task._id}
                        _id={task._id}
                        title={task.title}
                        likes={task.likes.length}
                    />
                ))
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
