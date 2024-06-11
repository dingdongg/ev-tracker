import { SvelteKitAuth } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";
import { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Github({
            clientId: AUTH_GITHUB_ID,
            clientSecret: AUTH_GITHUB_SECRET,
        }),
    ],
    trustHost: true,
    secret: AUTH_SECRET,
});