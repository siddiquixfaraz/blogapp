import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex align-middle justify-center gap-10 py-3 shadow-md font-bold text-xl'>
        <Link to="/">Home </Link>
        <Link to="/create">Create</Link>
    </nav>
  )
}

export default Navbar