import { PRIVATE_API_KEY } from "$env/static/private";
import { get } from "$lib/server/api";

/** @type {import("./$types").RequestHandler} */
export async function GET(event) {
    const res = await get("/abilities", {
        "x-api-key": PRIVATE_API_KEY,
        "Content-Type": "application/json",
    });

    return new Response(res.body, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "cache-control": "public, max-age=3600",
        },
    });
}
