import {useContext, useState} from 'react'
import './App.css'
import {AuthContext} from "./context/AuthContext.jsx";
import LoginComponent from "./components/LoginComponent.jsx";

function App() {
  const {user, logout} = useContext(AuthContext);

  return (
      <div>
            {user ? (
                <>
                    <h1>Welcome, {user.username}!</h1>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <LoginComponent />
            )}
        </div>
  )
}

export default App
