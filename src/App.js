import { useContext, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import AppContext from './context/appContext';
import Home from './pages/home';
import BlogPage from './pages/blogpage';
import TagPage from './pages/tagpage';
import CategoryPage from './pages/categorypage';

function App() {
  const {fetchBlogPosts} = useContext(AppContext)

  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // calling api conditionally by checking url
  useEffect( () => {
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      // it means tag page should be displayed
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag)
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), null, category)
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search] )
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/blog/:blogId' element={<BlogPage />} />
      <Route path='/tags/:tag' element={<TagPage />}/>
      <Route path='/categories/:category' element={<CategoryPage />}/>
    </Routes>
  );
}

export default App;
