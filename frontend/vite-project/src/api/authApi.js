const API_URL = "http://localhost:8000";

export async function signUp(username, password){
    const response = await fetch(`${API_URL}/auth/signup`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.detail || "Signup failed")
    }

    return data;
}

export async function logIn(username, password) {
    const response = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.detail || "Login failed")
    }

    return data;
}