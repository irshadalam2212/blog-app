import React, { useContext } from 'react'
import AppContext from '../context/appContext'
import Spinner from './spinner'
import BlogDetails from './blogDetails'

const Blogs = () => {

    const { posts, loading } = useContext(AppContext)

  return (
    <div>
      {
        loading ? (<Spinner />) : posts.length === 0 ? (
            <div>
                <p>No Blogs Found</p>
            </div>
        ) : (
            posts.map( (post) => (
                <BlogDetails key={post.id} post={post} />
            ) )
        )
      }
    </div>
  )
}

export default Blogs
