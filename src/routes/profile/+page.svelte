<script>
    import { SignOut } from "@auth/sveltekit/components";

    /** @type {import("./$types").PageData}*/
    export let data;
    console.log(data);
</script>

<div class="flex flex-col items-center py-14 px-10 rounded-xl border-[1px] border-gray w-[60%]">
    <p class="text-4xl mb-10">Profile Section</p>
    {#if data.session}
        <div class="flex items-center mb-10">
            <img src={data.session.user?.image} draggable="false" alt="profile pic" width="90" height="90" class="border-[1px] border-gray rounded-full" loading="lazy" />
            <div class="flex flex-col leading-10 px-4">
                <p class="text-2xl">{data.session.user?.name}</p>
                <p>{data.session.user?.email}</p>
            </div>
        </div>
    {:else}
        <p>you shouldn't have access to this page</p>
    {/if}
    
    <SignOut signOutPage="profile" options={{ redirectTo: "/" }}>
        <span slot="submitButton" class="py-3 px-5 border-2 text-xl rounded-xl hover:bg-zinc-700">sign out</span>
    </SignOut>
</div>