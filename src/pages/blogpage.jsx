import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/appContext";
import Navbar from "../components/navbar";
import Spinner from "../components/spinner"
import BlogDetails from "../components/blogDetails"
import { useState } from "react";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log(url, "new url");

    try {
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data);
      setRelatedBlogs(data.relatedblogs);
    } catch (error) {
      console.log("Error occured while calling API", error);
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  // calling fetchRelatedBlogs function
  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <button
            className="mb-6 border-2 rounded-md border-[#dfdfdf] py-1 px-4 hover:bg-[#efefef] transition-all"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : blog ? (
          <div className="flex flex-col gap-y-10">
            <BlogDetails post={blog} />
            <h2 className="text-3xl font-bold"> Related Blogs </h2>
            {relatedblogs.map((post) => (
              <div key={post.id}>
                <BlogDetails post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No Blog Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
