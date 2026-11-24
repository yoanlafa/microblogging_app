import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function NavBar() {
    const { logout, token } = useContext(AuthContext);

    return (
        <nav className="bg-white bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-gray-200 border-default shadow-xs">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="text-lg font-bold text-gray-800">
                    Microblog
                </Link>
                <div className="w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-row items-center space-x-6 md:space-x-8 rtl:space-x-reverse mt-0 border-0">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-blue-600 hover:text-blue-800 md:p-0"> Home </Link>
                        </li>

                        <li>
                            <Link to="/create" className="block py-2 px-3 text-blue-600 hover:text-blue-800 md:p-0"> Create Post </Link>
                        </li>

                        {token && (
                            <>
                                <li>
                                    <Link to="/profile" className="block py-2 px-3 text-blue-600 hover:text-blue-800 md:p-0">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="block py-1 px-3 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                </div>

            </div>

        </nav>
    )

}

export default NavBar
