const BASE_URL = 'http://localhost:8001';

export async function api(endpoint, method = 'GET', payload){
    const url = `${BASE_URL}${endpoint}`;
    let config = {};

    if(method === "DELETE"){
        config = {
            method
        }
    }

    if(method === "POST" || method === "PUT"){
        config = {
            method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload)
        }
    }

    const response = await fetch(url, config);
    return await response.json();
}