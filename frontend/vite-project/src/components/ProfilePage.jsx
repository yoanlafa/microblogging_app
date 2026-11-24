import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getUserProfile, uploadProfilePicture } from "../api/userApi.js";
import PostList from "../components/PostList.jsx";


function ProfilePage() {
    const { token } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [loading, setLoading] = useState(Boolean(token));
    const [uploading, setUploading] = useState(false);
    const [imageVersion, setImageVersion] = useState(null);
    const fileInputRef = useRef(null);


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


    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;

        setUploading(true);
        setUploadError("");

        try {
            const data = await uploadProfilePicture(token, file);

            setProfile((previousProfile) => ({
                ...previousProfile,
                profile_picture: data.profile_picture,
            }));
            setImageVersion(Date.now());
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    if (!profile) {
        return <p className="text-center mt-10">No profile data available.</p>;
    }

    const profilePictureUrl = profile.profile_picture
        ? `http://localhost:8000${profile.profile_picture}${
              imageVersion
                  ? `${profile.profile_picture.includes("?") ? "&" : "?"}t=${imageVersion}`
                  : ""
          }`
        : null;

    return (
        <div className="max-w-3xl mx-auto p-6">

            <div className="bg-white shadow-md rounded-xl p-6 mb-6">

                <h1 className="text-3xl font-bold mb-4">
                    {profile.username}
                </h1>

                <p className="text-gray-500 mb-6">
                    Member since:{" "}
                    {new Date(profile.created_at).toLocaleDateString()}
                </p>

                {/* Current profile picture */}
                <div className="mb-4">
                    {profilePictureUrl ? (
                        <img
                            src={profilePictureUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No picture
                        </div>
                    )}
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Upload button */}
                <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {uploading ? "Uploading..." : "Upload picture"}
                </button>

                {uploadError && (
                    <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                )}

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
                    <PostList posts={profile.recent_posts} profilePicture={profilePictureUrl} />
                )}
            </div>

        </div>
    );
}

export default ProfilePage;