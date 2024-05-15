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

            body = await res.json();
    
            if (res.status !== 200) {
                throw new Error("Invalid status code from server", { cause: body.message });
            }
        } catch (err) {
            console.log("Error fetching results", err);
            return {
                error: true,
                message: err,
            };
        }

        return { 
            error: false,
            data: body,
        };
    }
};