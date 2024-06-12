import { PRIVATE_API_KEY, PRIVATE_BACKEND_URL } from "$env/static/private";

/** @type {import("./$types").RequestHandler} */
export async function POST(event) {
    // return new Response(null, { status: 403 });
    const session = await event.locals.auth();
    let sessionExpired = session?.expires && new Date() > new Date(session.expires);

    if (!session?.user || sessionExpired) {
        return new Response(null, { status: 403 });
    }
    
    const body = await event.request.json();
    const payload = {
        requests: body,
        userId: session.user.id,
    };

    // TODO: change URL back to private backend url
    const res = await fetch(`${PRIVATE_BACKEND_URL}/save`, {
        method: "POST",
        body: JSON.stringify(payload),
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

    return new Response(dataUrl, {
        status: 200,
        headers: { 
            "Content-Type": "text/plain", 
        },
    });
}
