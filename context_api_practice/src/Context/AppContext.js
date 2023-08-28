import React, { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

// context creation
export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(null);
  const navigate = useNavigate();

  //   data filling

  async function fetchblogpost(page = 1, tag = null, category) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const result = await fetch(url);
      const data = await result.json();
      setPage(data.page);
      setPosts(data.posts);
      setTotalpages(data.totalPages);
    } catch (error) {
      console.log("error in fetching data");
      setPage(1);
      setTotalpages(null);
      setPosts([]);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    setPage(page);
    navigate({ search: `?page=${page}` });
    // fetchblogpost(page);
  }

  const value = {
    posts,
    loading,
    setLoading,
    setPosts,
    page,
    setPage,
    totalpages,
    setTotalpages,
    fetchblogpost,
    handlePageChange,
  };

  // sending the data

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
