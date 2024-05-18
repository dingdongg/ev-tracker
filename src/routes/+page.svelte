<script>
    import { enhance } from "$app/forms";
    import Pokemon from "$lib/Pokemon.svelte";
    
    /** @type {import('./$types').ActionData} */
    export let form;

    let loading = false;
</script>

<div class="flex flex-col py-12 px-48 justify-center items-center relative">
    <h1 class="text-8xl">Pokemon EV Tracker</h1>

    {#if form?.data}
        <h2 class="text-4xl my-10">Party Pokemon</h2>
        <div class="grid grid-rows-2 grid-cols-3 gap-4">
        {#each form.data as p}
            <Pokemon pokemon={p} />
        {/each}
        </div>
    {:else if form?.error}
        <p class="text-2xl mt-16">
            Something went wrong! Please try again. 
        </p>
    {:else}
        <p class="text-4xl mt-10">See your EVs in generation 4/5 NDS games.</p>

        <ul class="text-2xl mt-5">
            <li>- Pokemon Platinum</li>
            <li>- Pokemon HeartGold & SoulSilver</li>
            <li>- Pokemon Black & White</li>
            <li>- Pokemon Black 2 & White 2</li>
        </ul>
    {/if}

    <p class="text-3xl mt-10 text-center w-[80%]">
        Savefiles are sent to the server for the sole purposes of parsing,
        and they are not stored anywhere on our servers.
    </p>
    <p class="text-4xl my-12 text-red-600">
        Only upload <span class="underline underline-offset-4">savefiles</span> (.SAV)
        that are <span class="underline underline-offset-4">legally obtained AND owned</span>.
    </p>
    
    {#if loading}
        <p class="text-2xl py-3 px-6">Processing your savefile...</p>
    {:else}
        <form action="?/submitFile" method="POST" enctype="multipart/form-data" use:enhance={() => {
            loading = true;
            return async ({ update }) => {
                loading = false;
                update();
            };
        }}>
            <input type="file" name="savefile" id="savefile" required class="
                file:py-2 file:px-6 file:bg-transparent file:border-none
                file:mr-10 file:bg-slate-700 text-xl file:rounded-full
                file:hover:bg-slate-600
            "/>
            <button type="submit" class="mt-3 mr-[20px] py-3 px-5 border-2 text-xl rounded-full">
                submit file
            </button>
        </form>
    {/if}
    
</div>
