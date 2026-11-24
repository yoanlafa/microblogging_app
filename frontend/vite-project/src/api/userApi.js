const API_URL = "http://localhost:8000/users";

export async function getUserProfile(token) {
    const response = await fetch (`${API_URL}/me`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
    }});

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch user profile");
    }

    return data;
}

export async function uploadProfilePicture(token, image) {

    const formData = new FormData();
    formData.append("file", image)

    const response = await fetch(`${API_URL}/me/profile-picture`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to update profile picture");
    }

    return data;
}
