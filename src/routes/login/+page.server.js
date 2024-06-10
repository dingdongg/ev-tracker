import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth";

/** @type {import("./$types").Actions} */
export const actions = { default: signIn };

/** @type {import("./$types").PageServerLoad} */
export async function load({ parent }) {
    const { session } = await parent();

    if (session) {
        redirect(302, "/"); // if authenticated, redirect from /login to main page
    }
}