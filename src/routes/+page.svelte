<script>
// @ts-nocheck

    import { enhance } from "$app/forms";
    import Pokemon from "$lib/pokemon/Pokemon.svelte";
    import { getContext } from "svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { PARTY_POKEMON_CONTEXT } from "$lib/constants";
    import { fade } from "svelte/transition";
    
    let loading = false;
    let loginPrompted = false;
    let downloadStarted = false;

    // causes issues with navigating between different pages in the app
    // beforeNavigate((nav) => {
    //     if (form) nav.cancel();
    // });

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
     * Handler for downloading updated savefiles
     * @param event {SubmitEvent}
     */
    async function updateSavefile(event) {
        event.preventDefault();

        try {
            const res = await fetch("/api/update", {
                method: "POST",
                body: JSON.stringify($ctx.data),
            });

            if (res.status === 403) {
                throw new Error(res.statusText);
            }

            if (res.status === 500) {
                ctx.set({ error: true, data: [], message: res.statusText });
                return;
            }

            downloadStarted = true;
            
            const url = await res.text();
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "savefile");
            link.click(); 
        } catch (err) {
            loginPrompted = true;
        }
    }

    const getItems = async () => {
        if (!$items.length) {
            console.log("fetch items from server")
            const res = await fetch("/api/items");
            const body = await res.json();
            items.set(Object.entries(body)); // TODO: filter out some of the "non-holdable" items?
        }

        // TODO: cache fetch results in context for subsequent requests
        // TODO: move this up to the parent page for fetching? (ie. fetch when making request to /post-savefile and cache there)
        if (!$abilities.length) {
            console.log("fetch abilities from server")
            const abilitiesRes = await fetch("/api/abilities");
            const abilitiesBody = await abilitiesRes.json();
            abilities.set(Object.entries(abilitiesBody));
        }
    };

    /**
     * @type {any}
     */
    let inputValue;

    /** @type {import("svelte/store").Writable} */
    const ctx = getContext(PARTY_POKEMON_CONTEXT); 
    let items = getContext("items");
    let abilities = getContext("abilities");
    $: console.log("CONTEXT OBJ CHANGED", $ctx); // ran whenever the context value changes
</script>

<Dialog.Root bind:open={loginPrompted}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Login Required</Dialog.Title>
            <Dialog.Description>
                This feature requires you to be logged in.
                <a href="/login" class="underline underline-offset-4"> Log in here</a>!
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>

<h1 class="text-7xl">Pokemon EV Tracker</h1>

<p class="text-3xl mt-10 text-zinc-300">See your EVs in generation 4/5 NDS games.</p>
<ul class="text-2xl mt-5 text-zinc-300">
    <li>- Pokemon Platinum</li>
    <li>- Pokemon HeartGold & SoulSilver</li>
    <li>- Pokemon Black & White</li>
    <li>- Pokemon Black 2 & White 2</li>
</ul>
<!-- <p class="text-3xl mt-10 text-center w-[80%]">
    Savefiles are sent to the server for the sole purposes of parsing,
    and they are not stored anywhere on our servers.
</p> -->
<p class="text-3xl my-12 text-red-600">
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
        getItems();
        loading = true;
        inputValue = null;
        ctx.set({ data: [] });
        return async ({ result, update }) => {
            loading = false;
            ctx.set(result.data);
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

{#if $ctx.data?.length > 0}
    <form in:fade={{ duration: 300 }} on:submit={(event) => updateSavefile(event)} class="px-16">
        <div class="flex justify-between items-center my-10" use:scrollIntoView>
            <h2 class="text-4xl pt-5">Party Pokemon</h2>
            <button type="submit" class={`${!inputValue && "opacity-40"} mt-5 py-3 px-5 border-2 text-xl rounded-xl hover:bg-zinc-700`}>
                { downloadStarted ? "Download started!" : "Download savefile" }
            </button>
        </div>
        <div class="grid xl:grid-rows-2 xl:grid-cols-3 gap-4 md:grid-rows-3 md:grid-cols-2 grid-cols-1">
        {#each $ctx.data as p, index}
            <Pokemon pokemon={p} index={index} />
        {/each}
        </div>
    </form>
{/if}
{#if $ctx.error}
    <p in:fade={{ duration: 200 }} class="text-2xl mt-16 w-full flex justify-center items-center">
        {#if $ctx.message.toLowerCase().includes("invalid file")}
        <span>Invalid savefile. Please re-submit a valid savefile</span>
        {:else}
        <span>Something went wrong! Please try again. </span>
        {/if}
    </p>
{/if}
