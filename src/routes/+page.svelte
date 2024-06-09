<script>
// @ts-nocheck

    import { enhance } from "$app/forms";
    import { beforeNavigate } from "$app/navigation";
    import Pokemon from "$lib/Pokemon.svelte";
    import { writable } from "svelte/store";
    import { setContext, getContext } from "svelte";
    
    /** @type {import('./$types').ActionData} */
    export let form;

    let loading = false;

    beforeNavigate(({ cancel }) => {
        if (form) cancel();
    })

    /**
     * Svelte action to scroll to a node
     * @param {HTMLHeadingElement} node
     */
    function scrollIntoView(node) {
        function update() {
            node.scrollIntoView({ behavior: "smooth" });
        }

        update();
        return { update };
    }

    /**
     * @type {any}
     */
    let inputValue;

    const ctx = getContext("yer");
    console.log("CONTEXT", $ctx);
    $: console.log("CONTEXT OBJ CHANGED", $ctx); // ran whenever the context value changes
</script>

<div class="flex flex-col py-12 px-48 justify-center items-center relative">
    <h1 class="text-8xl">Pokemon EV Tracker</h1>

    <p class="text-4xl mt-10">See your EVs in generation 4/5 NDS games.</p>
    <ul class="text-2xl mt-5">
        <li>- Pokemon Platinum</li>
        <li>- Pokemon HeartGold & SoulSilver</li>
        <li>- Pokemon Black & White</li>
        <li>- Pokemon Black 2 & White 2</li>
    </ul>
    <!-- <p class="text-3xl mt-10 text-center w-[80%]">
        Savefiles are sent to the server for the sole purposes of parsing,
        and they are not stored anywhere on our servers.
    </p> -->
    <p class="text-4xl my-12 text-red-600">
        Only upload <span class="underline underline-offset-4">savefiles</span> (.SAV)
        that are <span class="underline underline-offset-4">legally obtained AND owned</span>.
    </p>

    {#if loading}
        <div class="text-2xl py-3 px-6 flex">
            <svg class="animate-spin mt-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Processing your savefile...</p>
        </div>
    {:else}
        <form action="?/submitFile" method="POST" enctype="multipart/form-data" use:enhance={() => {
            loading = true;
            form = null;
            return async ({ result, update }) => {
                loading = false;
                $ctx = result.data.data;
                console.log($ctx);
                update();
            };
        }}>
            <input type="file" name="savefile" id="savefile" bind:files={inputValue} required class="
                file:py-3 file:px-6 file:bg-transparent file:border-none
                file:mr-10 file:bg-zinc-700 text-xl file:rounded-r-none
                file:hover:bg-zinc-600 border-2 border-zinc-700 rounded-xl hover:bg-zinc-800
                mr-5
            "/>
            <button type="submit" class={`${!inputValue && "opacity-40"} mt-3 mr-[20px] py-3 px-5 border-2 text-xl rounded-xl hover:bg-zinc-700`}>
                submit file
            </button>
        </form>
    {/if}

    {#if form?.data}
        <h2 class="text-4xl my-10 pt-5" use:scrollIntoView>Party Pokemon</h2>
        <div class="grid grid-rows-2 grid-cols-3 gap-4">
        {#each $ctx as p}
            <Pokemon pokemon={p} />
        {/each}
        </div>
    {:else if form?.error}
        <p class="text-2xl mt-16">
            {#if form?.message.toLowerCase().includes("invalid file")}
            Invalid savefile. Please re-submit a valid savefile
            {:else}
            Something went wrong! Please try again. 
            {/if}
        </p>
    {/if}
</div>
