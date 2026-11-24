import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getUserProfile } from "../api/userApi.js";
import PostList from "../components/PostList.jsx";


function ProfilePage() {
    const { token } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(Boolean(token));

    useEffect(() => {
        if (!token) return;
        let isMounted = true;

        getUserProfile(token)
            .then((data) => {
                if (isMounted) {
                    setProfile(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [token]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    if (!profile) {
        return <p className="text-center mt-10">No profile data available.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">
                    {profile.username}
                </h1>

                <p className="text-gray-500">
                    Member since:{" "}
                    {new Date(profile.created_at).toLocaleDateString()}
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">
                    Recent Posts
                </h2>

                {!profile.recent_posts || profile.recent_posts.length === 0 ? (
                    <p className="text-gray-500">
                        You haven't posted anything yet.
                    </p>
                ) : (
                    <PostList posts={profile.recent_posts} />
                )}
            </div>

        </div>
    );
}

export default ProfilePage;