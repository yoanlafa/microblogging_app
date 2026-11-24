import {useState} from "react";
import {useNavigate} from "react-router-dom";

function PostForm ( {addPost} ) {
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        await addPost(description);
        setDescription("");
        navigate("/");
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
                <label
                    className="block mb-2.5 text-sm font-medium text-gray-700"
                >
                    Write your text here:
                </label>

                <input
                type="text"
                className="bg-neutral-secondary-medium border border-gray-300
                text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5
                shadow-xs mb-4"
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                placeholder="What's happening?"
                required
                />

                <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium
                rounded text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PostForm;