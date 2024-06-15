<script>
    import { PARTY_POKEMON_CONTEXT } from "$lib/constants";
    import "../app.css";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    setContext(PARTY_POKEMON_CONTEXT, writable([]));

    /** @type {import("./$types").LayoutData}*/
    export let data;


    // console.log("layout data: ", data);
</script>

<div class="flex justify-end py-4 pr-10 border-b-zinc-600 border-[1px] bg-black">
    <a href="/" class="mr-7 hover:underline underline-offset-4">Main page</a>
    {#if data.session}
        <a href="/profile" class="hover:underline underline-offset-4">Profile</a>
    {:else}
        <a href="/login" class="hover:underline underline-offset-4">Log in</a>
    {/if}
</div>

<div class="flex flex-col py-12 xl:px-48 px-8 items-center justify-center relative">
    <slot />
</div>

<div class="flex flex-col items-end py-4 pr-10">
    <a href="https://github.com/dingdongg/ev-tracker" target="_blank" class="hover:underline underline-offset-4">
        Source code (frontend)
    </a>
    <a href="https://github.com/dingdongg/ev-tracker-api" target="_blank" class="hover:underline underline-offset-4">
        Source code (backend)
    </a>
</div>