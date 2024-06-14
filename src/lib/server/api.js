import { PRIVATE_BACKEND_URL } from "$env/static/private";

// const baseUrl = "http://localhost:8080";
const baseUrl = PRIVATE_BACKEND_URL;

/**
 * Generic POST request
 * @param {string} path `"/path_value"`
 * @param {Object} body 
 * @param {HeadersInit} headers 
 */
export async function post(path, body, headers) {
    console.log("POST", baseUrl);
    const res = await fetch(baseUrl + path, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
    });

    return res;
}

/**
 * POST requests specifically for form data payloads
 * @param {string} path `"/path_value"`
 * @param {FormData} formData 
 * @param {HeadersInit} headers 
 */
export async function postForm(path, formData, headers) {
    console.log("POST (form)", baseUrl);
    const res = await fetch(baseUrl + path, {
        method: "POST",
        body: formData,
        headers,
    })

    return res;
}

/**
 * Generic GET Request
 * @param {string} path `"/path_value"`
 * @param {HeadersInit} headers 
 */
export async function get(path, headers) {
    console.log("GET", baseUrl);

    const res = await fetch(baseUrl + path, {
        method: "GET",
        headers,
    });

    return res;
}