/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ fetch, request }) => {
        const formData = await request.formData();

        // forward request to backend
        await fetch("http://localhost:8080/post-savefile", {
            method: "POST",
            body: formData,
        });
    }
};