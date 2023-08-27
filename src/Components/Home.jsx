import React from 'react'
import { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidEdit } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(" ");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    getBlogs();

  }, [posts])

  const getBlogs = async () => {
    const response = await fetch("https://blogbackendapi.onrender.com/get-blog");
    const data = await response.json();
    console.log(data.blogs)
    setPosts(data.blogs)
  }

  const deleteBlog = async (id) => {
    const response = await fetch(`https://blogbackendapi.onrender.com/delete-blog/${id}`, {
      method: "DELETE"
    });

    if(response.status===200){
      toast.success("Post deleted successfully")
    }else{
      toast.error("Error occured")
    }
  }

  const updatePost = async (id) =>{
    console.log(title,description,id)
  }

  return <>  <Toaster
    position="top-center"
    reverseOrder={false}
  />
    <div className='my-10 '>
      {posts.map((post) => (
        <div className='w-[40vw] border-2 mx-auto p-3 rounded-md mb-3 relative' key={post._id}>
          <div className='flex align-middle justify-end gap-2'>
            <BiSolidEdit className='hover:text-red-600 text-lg' 
            onClick={()=>{
              setShowEdit(!showEdit);
              setSelectedPost(post._id)
            }}/>
            <AiFillDelete className='hover:text-red-600 text-lg' onClick={() => deleteBlog(post._id)} />
          </div>
          <h2 className='font-bold text-xl text-gray-700 mb-2' 
          contentEditable={showEdit && true}
          onInput={(e)=> setTitle(e.target.innerText)}
          >{post.title}</h2>
          <h3 className='text-gray-700 text-lg' contentEditable={showEdit && true}
          onInput={(e)=> setDescription(e.target.innerText)}
          >{post.description}</h3>
          
        
               <button className= {` ${selectedPost === post._id && showEdit ? "block" : "hidden"} px-3 py-1 border-none text-white bg-green-400 hover:bg-green-500 mt-2 text-lg rounded-md absolute right-2 bottom-2`}
               onClick={()=>updatePost(post._id)}
               >Save</button>
            
          
          
        </div>
      ))}

    </div></>
    
  
}

export default Home