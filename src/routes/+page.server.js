import { PRIVATE_API_KEY, PRIVATE_BACKEND_URL } from '$env/static/private';

const MAX_FILE_SIZE = 1 << 19;

/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ fetch, request, locals }) => {
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
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            console.log("Request timed out");
            controller.abort();
        }, 8000);

        const session = await locals.auth();
        console.log("bouttta read savefile", session);
        const payload = {
            authenticated: session?.user !== null,
            userId: session?.user?.id || "",
        };

        formData.append("authState", new Blob([JSON.stringify(payload)], { 
            type: "application/json",
        }));

        try {
            const res = await fetch(`${"http://localhost:8080"}/post-savefile`, {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": PRIVATE_API_KEY,
                },
                signal: controller.signal,
            });

            console.log("Request to: ", PRIVATE_BACKEND_URL);
    
            if (res.status !== 200) {
                const bruh = await res.json();
                console.log("Error response:", bruh);
                throw new Error(`${res.status} ${bruh.message}`);
            }

            body = await res.json();
        } catch (err) {
            console.log("Error fetching results::", err);
            clearTimeout(timeout);

            // @ts-ignore
            const message = err?.message.toLowerCase();

            if (message.includes("invalid file")) {
                return { error: true, message: "invalid file" };
            }

            // @ts-ignore
            return { error: true, message };
        }
        clearTimeout(timeout);

        // console.log("results:", body);
        return { 
            error: false,
            data: body,
        };
    },
};