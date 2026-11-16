import {useContext, useEffect, useState} from 'react'
import './App.css'
import {AuthContext} from "./context/AuthContext.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import SignUpComponent from "./components/SignUpComponent.jsx";
import {getPosts} from "./api/postApi.js";
import PostList from "./components/PostList.jsx";

function App() {
  const {user, token, logout} = useContext(AuthContext);
  const [hasAccount, setHasAccount] = useState(true);
  const [posts, setPosts] = useState([]);


    useEffect(() => {
        if(token) {
            fetchPosts()
                .catch(console.error);
        }
    }, [token]);


  const changeHasAccount = () => {
      setHasAccount(!hasAccount);
  }


  const fetchPosts = async () => {
      try {
          const data = await getPosts(token);
          setPosts(data);
      } catch(error) {
          console.error(error)
      }
  }

  return (
      <div>
            {user ? (
                <>
                    <PostList posts={posts}/>
                </>
            ) : (
                hasAccount ? (<LoginComponent onSignupClick={changeHasAccount} />
                ): (<SignUpComponent onLoginClick={changeHasAccount}/>)
            )}
        </div>
  )
}

export default App
