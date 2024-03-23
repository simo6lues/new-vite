import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ProfilePost from '../components/ProfilePost'

const Profile = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {user, setUser} = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [updated, setUpdated] = useState(false) 
  const param = useParams().id
  const navigate = useNavigate()

  const fetchProfile = async ()=>{
    try {
      const res = await axios.get(URL+"/api/users/"+user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password) 
    } catch (err) {
      console.log(err);
    }
  }

  const handleUserUpdate= async ()=> {
    setUpdated(false)
    try {
      const res = await axios.put(URL+"/api/users/"+user._id,{username,email,password},
      {withCredentials:true})
      setUpdated(true)
    } catch (err) {
      
    }
  }

  const handleUserDelete = async()=>{
    try {
      const res = await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
      setUser(null)
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const fetchUserPosts = async ()=> {
    try {
      const res = await axios.get(URL+"/api/posts/user/"+user._id)
      setPosts(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchProfile()
  },[param])

  useEffect(()=>{
    fetchUserPosts()
  },[param])

  return (
    <div>
      <Navbar/>
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {posts?.map((p)=>(
            <ProfilePost key={p._id} p={p}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile    