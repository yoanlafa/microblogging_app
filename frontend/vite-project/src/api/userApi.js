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