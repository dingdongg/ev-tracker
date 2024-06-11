<script>
    import { SignIn } from "@auth/sveltekit/components";
    import * as Accordion from "$lib/components/ui/accordion";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";

    let signingIn = false;

    function changeText() {
        signingIn = true;
    }
    
</script>


<div class="flex flex-col items-center py-20 px-10 rounded-xl border-[1px] border-gray">
    <div class="text-4xl leading-loose">Log In</div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <SignIn provider="github" signInPage="login" options={{ redirectTo: "/" }}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={changeText} slot="submitButton" class="text-xl flex items-center justify-center w-max p-5 bg-zinc-500 py-4 rounded-xl mb-20 hover:bg-zinc-600">
            <GithubIcon className="mr-10" />
            { signingIn ? "signing in ..." : "sign in with github" }
        </span>
    </SignIn>
    <Accordion.Root class="min-w-[32vw] max-w-[60vw]">
        <Accordion.Item value="item-1">
            <Accordion.Trigger class="underline-offset-4 text-lg">Why should I make an account?</Accordion.Trigger>
            <Accordion.Content>
                <p>
                    If all you want to do is read your savefile, you don't need an account.
                </p>
                <p>
                    However, if you want to modify your savefile, you need to sign up!
                </p>
            </Accordion.Content>
            </Accordion.Item>
    </Accordion.Root>
</div>
