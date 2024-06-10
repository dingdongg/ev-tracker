import { PRIVATE_API_KEY } from "$env/static/private";

/** @type {import("./$types").RequestHandler} */
export async function POST(event) {
    // TODO: check if request is authorized
    const body = await event.request.json();

    // TODO: change URL back to private backend url
    const res = await fetch("http://localhost:8080/save", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "x-api-key": PRIVATE_API_KEY,
            "Content-Type": "application/json",
        },
    });

    // TODO: add error handling
    const b = await res.blob();
    const buf = await b.arrayBuffer();
    
    const mimeType = res.headers.get("Content-Type");
    const encoded = Buffer.from(buf).toString("base64");

    const dataUrl = `data:${mimeType};base64,${encoded}`;

    return new Response(
        dataUrl, {
            status: 200,
            headers: { 
                "Content-Type": "text/plain", 
            },
        },
    );
}
