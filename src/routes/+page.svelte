<script>
// @ts-nocheck

    import { enhance } from "$app/forms";
    import { beforeNavigate, goto } from "$app/navigation";
    import Pokemon from "$lib/Pokemon.svelte";
    import { writable } from "svelte/store";
    import { setContext, getContext } from "svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    
    /** @type {import('./$types').ActionData} */
    export let form;

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

    /**
     * @type {any}
     */
    let inputValue;

    const ctx = getContext("yer");
    $: console.log("CONTEXT OBJ CHANGED", $ctx); // ran whenever the context value changes
</script>

<Dialog.Root bind:open={loginPrompted}>
    <Dialog.Content>
        <Dialog.Header>
        <Dialog.Title>LOGIN PROMPTING MODAL</Dialog.Title>
        <Dialog.Description>
            This feature requires you to be logged in.
            <a href="/login" class="underline underline-offset-4"> Log in here</a>!
        </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>

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
        inputValue = null;
        return async ({ result, update }) => {
            loading = false;
            $ctx = result.data;
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

{#if $ctx.data}
    <form on:submit={(event) => updateSavefile(event)}>
        <div class="flex justify-between items-center my-10" use:scrollIntoView>
            <h2 class="text-4xl pt-5">Party Pokemon</h2>
            <button type="submit" class={`${!inputValue && "opacity-40"} mt-5 py-3 px-5 border-2 text-xl rounded-xl hover:bg-zinc-700`}>
                { downloadStarted ? "Download started!" : "Download savefile" }
            </button>
        </div>
        <div class="grid grid-rows-2 grid-cols-3 gap-4">
        {#each $ctx.data as p}
            <Pokemon pokemon={p} />
        {/each}
        </div>
    </form>
{:else if $ctx.error}
    <p class="text-2xl mt-16">
        {#if $ctx.message.toLowerCase().includes("invalid file")}
        Invalid savefile. Please re-submit a valid savefile
        {:else}
        Something went wrong! Please try again. 
        {/if}
    </p>
{/if}
