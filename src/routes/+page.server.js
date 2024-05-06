/** @type {import('./$types').Actions} */
export const actions = {
    submitFile: async ({ fetch, request }) => {
        const formData = await request.formData();

        const res = await fetch("http://localhost:8080/post-savefile", {
            method: "POST",
            body: formData,
        });

        const body = await res.json();
        return { data: body };
    }
};