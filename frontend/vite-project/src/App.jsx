import { useContext, useEffect, useState } from 'react'
import './App.css'
import { AuthContext } from "./context/AuthContext.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SignUpComponent from "./components/SignUpComponent.jsx";
import { createPost, getPosts } from "./api/postApi.js";
import PostList from "./components/PostList.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm.jsx";
import MainLayout from './layout/MainLayout.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function App() {
    const { token } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!token) return;
        let isMounted = true;
        getPosts(token)
            .then((data) => {
                if (isMounted) {
                    setPosts(data);
                }
            })
            .catch(console.error);

        return () => {
            isMounted = false;
        };
    }, [token]);

    const handleAddPost = async (description) => {
        try {
            const data = await createPost(token, description);
            setPosts((prevPosts) => [data, ...prevPosts]);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginComponent />} />
                <Route path="/signup" element={token ? <Navigate to="/" replace /> : <SignUpComponent />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="/" element={token ? <PostList posts={posts} /> : <Navigate to="/login" replace />} />
                <Route path="/create" element={token ? <PostForm addPost={handleAddPost} /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" replace />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App

