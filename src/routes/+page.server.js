import { PRIVATE_API_KEY } from '$env/static/private';
import { postForm } from '$lib/server/api';

const MAX_FILE_SIZE = 1 << 19;

/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ request, locals }) => {
        const formData = await request.formData();
        let body; 

        const fileInfo = formData.get("savefile");
        console.log("submitted file::", fileInfo);
        // @ts-ignore
        if (typeof fileInfo === "string" || fileInfo?.size > MAX_FILE_SIZE || fileInfo?.type !== "application/octet-stream") {
            console.log("invalid file");
            return { error: true, message: "invalid file" };
        }

        // request timeout
        // const controller = new AbortController();
        // const timeout = setTimeout(() => {
        //     console.log("Request timed out");
        //     controller.abort();
        // }, 8000);

        const session = await locals.auth();
        console.log("bouttta read savefile", session);
        const payload = {
            authenticated: session !== null,
            userId: session?.user?.id || "",
        };

        formData.append("authState", new Blob([JSON.stringify(payload)], { 
            type: "application/json",
        }));

        try {
            const res = await postForm("/post-savefile", formData, {
                "x-api-key": PRIVATE_API_KEY,
            });

            console.log("Request to: ", res.url);
    
            if (res.status !== 200) {
                const bruh = await res.json();
                console.log("Error response:", bruh);
                throw new Error(`${res.status} ${bruh.message}`);
            }

            body = await res.json();
        } catch (err) {
            console.log("Error fetching results::", err);
            // clearTimeout(timeout);

            // @ts-ignore
            const message = err?.message.toLowerCase();

            if (message.includes("invalid file")) {
                return { error: true, message: "invalid file" };
            }

            // @ts-ignore
            return { error: true, message };
        }
        // clearTimeout(timeout);

        return { 
            error: false,
            data: body,
        };
    },
};