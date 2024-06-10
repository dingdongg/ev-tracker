<script>
    import { SignOut } from "@auth/sveltekit/components";

    /** @type {import("./$types").PageData}*/
    export let data;
</script>

<div>
    PRIOFLEEEE
    {#if data.session}
        <p>{data.session.user?.name} is logged in</p>
    {:else}
        <p>you shouldn't have access to this page</p>
    {/if}
    
    <SignOut signOutPage="profile" options={{ redirectTo: "/" }}>
        <span slot="submitButton">sign out</span>
    </SignOut>
</div>