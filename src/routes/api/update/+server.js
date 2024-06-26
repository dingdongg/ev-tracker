import { PRIVATE_API_KEY } from "$env/static/private";
import { post } from "$lib/server/api";

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
    const res = await post("/save", payload, {
        "x-api-key": PRIVATE_API_KEY,
        "Content-Type": "application/json",
    });

    if (res.status === 500) {
        return new Response(null, { 
            status: 500,
            statusText: res.statusText,
        });
    }

    // TODO: add error handling
    const b = await res.blob();
    const buf = await b.arrayBuffer();

    const mimeType = res.headers.get("Content-Type");
    const encoded = Buffer.from(buf).toString("ascii"); // response is already b64-encoded

    const dataUrl = `data:${mimeType};base64,${encoded}`;

    return new Response(dataUrl, {
        status: 200,
        headers: { 
            "Content-Type": "text/plain", 
        },
    });
}
