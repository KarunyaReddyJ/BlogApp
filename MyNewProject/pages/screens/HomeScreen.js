import {Text,View} from 'react-native'
import { AuthContext } from '../../App'
import { useContext,useEffect,useState } from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
import {serverOrigin} from '../constants/constants'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function HomeScreen(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const getPosts=async()=>{
        const response=await axios.get(`http://${serverOrigin}:3000/post`)
        if(response.data)
            setPosts(response.data.posts)
      }
      getPosts()
    }, [posts]);
    return(
        <GestureHandlerRootView>
        <ScrollView>
        <View>
            
            {
                posts.map((task)=>{
                    return (<Blog content={task.content} key={task._id} _id={task._id} title={task.title} likes={task.likes.length} />)
                })
            }
        </View></ScrollView></GestureHandlerRootView>
    )
}