import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function SignUpComponent({onLoginClick}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {signup} = useContext(AuthContext);


    const handleSignup = async (e) => {
        e.preventDefault();
        setError("")

        try{
            await signup(username, password);
        } catch (err){
            setError(err.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded
                        w-full py-2 px-3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-black rounded w-full
                        py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="*******"
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        value={password}
                        required
                    />
                    <p className="text-gray-500 text-xs italic">Please enter your password</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                        focus:outline-none focus:shadow-outline"
                    >
                        SignUp
                    </button>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 px-6 py-4 hover:text-blue-700"
                        onClick={onLoginClick}
                    >
                        Already have an account ?
                    </label>
                </div>
            </form>
            {error && (
                <p className="text-red-500 text-sm mb-4">
                    {error}
                </p>
            )}
        </div>
    );
}

export default SignUpComponent