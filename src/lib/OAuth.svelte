<script>
    import { SignIn } from "@auth/sveltekit/components";

    /** @type {string} */
    export let provider;

    /** @type {string} */
    export let className = "";
</script>

<div class={className}>
    <SignIn provider={provider} signInPage="login" />
</div>