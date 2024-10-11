import React from 'react'
import Navbar from '../components/navbar'
import Blogs from '../components/blogs'
import Pagination from '../components/pagination'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Blogs />
      </div>
      <Pagination />
    </div>
  )
}

export default Home
