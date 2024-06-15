<script>
    export let id = "";

    /** @type {"ev" | "iv"} */
    export let type = "ev";

    /** @type {any} */
    export let value;
</script>

<input 
    class={"bg-transparent my-1 py-1 text-right border-[1px] border-zinc-600"} 
    id={id}
    bind:value
    type="number"
    min="0" 
    max={type === "ev" ? 255 : 31}
/>