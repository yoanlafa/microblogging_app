const API_URL = "http://localhost:8000/posts"

export async function getPosts(token) {
    const response = await fetch(`${API_URL}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail || "Failed to fetch posts");
    }

    return data;
}

export async function createPost(token, description){
    const response = await fetch(`${API_URL}/create`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            description: description
        })
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.detail || "Failed to create post")
    }

    return data;
}


