import { PRIVATE_API_KEY, PRIVATE_BACKEND_URL } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ fetch, request }) => {
        const formData = await request.formData();
        let body; 

        try {
            const res = await fetch(PRIVATE_BACKEND_URL, {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": PRIVATE_API_KEY,
                }
            });

            console.log("Request to: ", PRIVATE_BACKEND_URL);
    
            if (res.status !== 200) {
                const bruh = await res.json();
                console.log("Error response:", bruh);
                throw new Error(`${res.status} ${bruh.message}`);
            }

            body = await res.json();
        } catch (err) {
            console.log("Error fetching results", err);
            return {
                error: true,
                // @ts-ignore
                message: err?.message,
            };
        }

        return { 
            error: false,
            data: body,
        };
    }
};