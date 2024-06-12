import { SvelteKitAuth } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";
import { 
    AUTH_GITHUB_ID, 
    AUTH_GITHUB_SECRET, 
    AUTH_SECRET, 
    DEV_AUTH_GITHUB_ID,
    DEV_AUTH_GITHUB_SECRET,
    DEV_AUTH_SECRET,
} from "$env/static/private";

const githubConfig = (clientId: string, clientSecret: string, encryptionToken: string) => {
    return {
        providers: [
            Github({ clientId, clientSecret }),
        ],
        trustHost: true,
        secret: encryptionToken,
    };
};

let config;

if (import.meta.env.DEV) {
    config = githubConfig(DEV_AUTH_GITHUB_ID, DEV_AUTH_GITHUB_SECRET, DEV_AUTH_SECRET);
} else {
    config = githubConfig(AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET);
}

export const { handle, signIn, signOut } = SvelteKitAuth(config);