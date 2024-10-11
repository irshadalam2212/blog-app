import React, { Children, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../baseUrl'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    // state variables
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(null)

    // Hooks
    const navigate = useNavigate();

    // Fetching data from API for blog

    const fetchBlogPosts = async (page = 1, tag = null, category) => {
        setLoading(true)
        const url = `${baseUrl}?page=${page}`
        if(tag) {
            url += `&tag=${tag}`
        }
        if(category) {
            url += `&category=${category}`
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!data.posts && data.length === 0) {
                throw new Error ('Something Went Wrong!')
            }
            console.log("Api response", data)
            setPage(data.page)
            setPosts(data.posts)
            setTotalPages(data.totalPages)

        } catch (error) {
            console.log("Error fetching blog posts", error)
            setPage(1)
            setPosts([])
            setTotalPages(null)
        }
        setLoading(false)
    };

    // Handle next and previous button click
    const handlePageChange = (page) => {
        navigate( {search: `?page=${page}`})
        setPage(page)
    }

    // value object to send ApppContext

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        totalPages,
        setTotalPages,
        page, 
        setPage,
        fetchBlogPosts,
        handlePageChange
    }

    return (
        <AppContext.Provider value={value}>{ children }</AppContext.Provider>
    )
}

export default AppContext
