<script>
    import { SignIn } from "@auth/sveltekit/components";
    import * as Accordion from "$lib/components/ui/accordion";
</script>

<div>login type shiii</div>

<div class="bg-zinc-600 min-w-[40vw] flex flex-col items-center py-20">
    <p>Log In</p>
    <SignIn provider="github" signInPage="login" options={{ redirectTo: "/" }}>
        <span slot="submitButton">Sign in with Github</span>
    </SignIn>
</div>
<Accordion.Root class="min-w-[40vw] max-w-[60vw]">
    <Accordion.Item value="item-1">
        <Accordion.Trigger>Why should I make an account?</Accordion.Trigger>
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