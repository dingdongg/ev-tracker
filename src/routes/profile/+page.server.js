import { signOut } from '../../auth';
import { redirect } from "@sveltejs/kit";

/** @type {import("./$types").Actions} */
export const actions = { default: signOut };


/** @type {import("./$types").PageServerLoad} */
export async function load({ parent }) {
    const { session } = await parent();

    if (!session) {
        redirect(302, "/login"); // if not authenticated, redirect to login page
    }
}