import { PRIVATE_BACKEND_URL } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ fetch, request }) => {
        const formData = await request.formData();
        let body;

        try {
            const res = await fetch(PRIVATE_BACKEND_URL, {
                method: "POST",
                body: formData,
            });
    
            if (res.status !== 200) {
                throw new Error(`${res.status} ${res.statusText}`);
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