/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const session = await event.locals.auth();

    // console.log("session from layout load", session);
    return { session };
}