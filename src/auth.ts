import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import Github from "@auth/sveltekit/providers/github";
import { 
    AUTH_GITHUB_ID, 
    AUTH_GITHUB_SECRET, 
    AUTH_SECRET, 
    DEV_AUTH_GITHUB_ID,
    DEV_AUTH_GITHUB_SECRET,
    DEV_AUTH_SECRET,
} from "$env/static/private";

const githubConfig = (clientId: string, clientSecret: string, encryptionToken: string): SvelteKitAuthConfig => {
    return {
        providers: [
            Github({ clientId, clientSecret }),
        ],
        trustHost: true,
        secret: encryptionToken,
        callbacks: {
            jwt({ token, user }) {
                if (user) token.id = user.id;
                return token;
            },
            session({ session, token }) {
                session.user.id = token.id as string;
                return session;
            }
        }
    };
};

let config;

if (import.meta.env.DEV) {
    config = githubConfig(DEV_AUTH_GITHUB_ID, DEV_AUTH_GITHUB_SECRET, DEV_AUTH_SECRET);
} else {
    config = githubConfig(AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET);
}

export const { handle, signIn, signOut } = SvelteKitAuth(config);