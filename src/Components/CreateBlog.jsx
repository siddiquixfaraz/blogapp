import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {

  const navigate = useNavigate()

  const postBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    console.log(title, description);

    const blog = {
      title,
      description,
    }

    //code is for sending data to the backend
    const response = await fetch("https://blogbackendapi.onrender.com/post-blog", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    });

    if (response.status === 200) {
      toast.success('Posted Successfully')
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => {
        navigate("/")
      }, 3000);
      
    } else {
      alert("Something went wrong")
    }

  }
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className='w-[60vw] mx-auto mt-10'>
      <h1 className='text-center text-2xl font-bold'>Create Blogs</h1>
      <form className='flex flex-col gap-3' onSubmit={postBlog}>
        <label htmlFor="title" className='font-bold'>Title :</label>
        <input type="text" name='title' placeholder='Enter Your Title Here'
          className='py-2 px-3 outline-none border-2 border-gray-300 rounded-md' />
        <label htmlFor="description" className='font-bold'>Description :</label>
        <textarea type="text" name='description'
          className='py-2 px-3 outline-none border-2 border-gray-300 rounded-md h-80' />
        <button type="submit" className='bg-purple-400 hover:bg-purple-700 rounded-md p-2 text-center text-white'>POST</button>
      </form>
    </div>
    </>
  )
}

export default CreateBlog