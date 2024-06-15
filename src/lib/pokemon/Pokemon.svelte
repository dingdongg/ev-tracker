<script>
    import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "$lib/components/ui/sheet";
    import { getContext } from "svelte";
    import NumberInput from "./NumberInput.svelte";

    export let pokemon;

    const IMAGE_SIZE = 140;

    /**
     * @type {[string, { Index: number, Exclusivity: string }][]}
     */
    let items = [];

    const getItems = async () => {
        const res = await fetch("/api/items");

        const body = await res.json();
        console.log(body);
        items = Object.entries(body); // TODO: filter out some of the "non-holdable" items?
    };

    /**
     * light blue for S [196, 255]
     * green for A [132, 195]
     * yellow for B [68, 131]
     * orange for C [4, 67]
     * grey for < 4 [0, 3]
     * 
     * @param ev {number}
    */
    const getColor = (ev) => {
        if (ev < 4) {
            return "text-D";
        } else if (ev < 68) {
            return "text-C";
        } else if (ev < 132) {
            return "text-B";
        } else if (ev < 196) {
            return "text-A";
        } else if (ev <= 255) {
            return "text-S";
        } else {
            return "";
        }
    };

    const ctx = getContext("yer");

    let modifiedHp = pokemon.effortValues.hp;
    let modifiedAtk = pokemon.effortValues.atk;
    let modifiedDef = pokemon.effortValues.def;
    let modifiedSpa = pokemon.effortValues.spa;
    let modifiedSpd = pokemon.effortValues.spd;
    let modifiedSpe = pokemon.effortValues.spe;

    const updateStore = () => {
        console.log("updating store");
        const newResults = [];

        for (const p of $ctx.data) {
            console.log(p);
            const newP = JSON.parse(JSON.stringify(p));
            if (newP.id === pokemon.id) {
                newP.effortValues = {
                    hp: modifiedHp,
                    atk: modifiedAtk,
                    def: modifiedDef,
                    spa: modifiedSpa,
                    spd: modifiedSpd,
                    spe: modifiedSpe,
                };
            }
            newResults.push(newP);
        }
        console.log(newResults);
        console.log(ctx);
        ctx.set({ data: newResults });
    };
</script>

<Sheet>
    <SheetTrigger on:click={getItems}>
        <div class="flex flex-col border-[1px] border-gray rounded-lg p-2">
            <div class="flex items-center mb-2">
                <img src={pokemon.spriteUrl} alt="palceholder" draggable="false" width={IMAGE_SIZE} height={IMAGE_SIZE} class="border-[1px] border-gray/25 rounded-lg" />
                <div class="space-y-1 ml-5 text-left">
                    <p class="text-xl">{ pokemon.name }</p>
                    <p>Lv. { pokemon.level } / { pokemon.nature }</p>
                    <p>{ pokemon.ability }</p>
                    <p>{ pokemon.heldItem }</p>
                </div>
            </div>
            <div class="flex justify-center text-lg">
                <div class="text-right">
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Sp. Atk</p>
                    <p>Sp. Def</p>
                    <p>Speed</p>
                </div>
                <div class="text-left ml-5">
                    <p>
                        { pokemon.battleStats.hp }
                        (<span class={getColor(pokemon.effortValues.hp)}>+{ pokemon.effortValues.hp }</span>)
                    </p>
                    <p>
                        { pokemon.battleStats.atk }
                        (<span class={getColor(pokemon.effortValues.atk)}>+{ pokemon.effortValues.atk }</span>)
                    </p>
                    <p>
                        { pokemon.battleStats.def }
                        (<span class={getColor(pokemon.effortValues.def)}>+{ pokemon.effortValues.def }</span>)
                    </p>
                    <p>
                        { pokemon.battleStats.spa }
                        (<span class={getColor(pokemon.effortValues.spa)}>+{ pokemon.effortValues.spa }</span>)
                    </p>
                    <p>
                        { pokemon.battleStats.spd }
                        (<span class={getColor(pokemon.effortValues.spd)}>+{ pokemon.effortValues.spd }</span>)
                    </p>
                    <p>
                        { pokemon.battleStats.spe }
                        (<span class={getColor(pokemon.effortValues.spe)}>+{ pokemon.effortValues.spe }</span>)
                    </p>
                </div>
            </div>
        </div>
    </SheetTrigger>
    <SheetContent class="flex flex-col">
        <SheetTitle class="mb-5">{ pokemon.name } - Edit EVs</SheetTitle>

        <table class="text-xl border-separate border-spacing-y-2">
            <thead class="text-center border-b-2 border-zinc-500">
                <tr>
                    <th class="border-b-2 border-zinc-500"></th>
                    <th class="border-b-2 border-zinc-500">Value</th>
                    <th class="border-b-2 border-zinc-500 pl-5">EV</th>
                    <th class="border-b-2 border-zinc-500 pl-5">IV</th>
                </tr>
            </thead>
            <tbody class="text-right">
                <tr class="bg-zinc-800">
                    <td>HP</td>
                    <td>{ pokemon.battleStats.hp }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-hp`} type="ev" bind:value={modifiedHp} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-hp`} type="iv" bind:value={pokemon.indivValues.hp} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Attack</td>
                    <td>{ pokemon.battleStats.atk }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-atk`} type="ev" bind:value={modifiedAtk} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-atk`} type="iv" bind:value={pokemon.indivValues.atk} /></td>
                </tr>
                <tr class="bg-zinc-800">
                    <td>Defense</td>
                    <td>{ pokemon.battleStats.def }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-def`} type="ev" bind:value={modifiedDef} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-def`} type="iv" bind:value={pokemon.indivValues.def} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Sp. Atk</td>
                    <td>{ pokemon.battleStats.spa }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spa`} type="ev" bind:value={modifiedSpa} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spa`} type="iv" bind:value={pokemon.indivValues.spa} /></td>
                </tr>
                <tr class="bg-zinc-800">
                    <td>Sp. Def</td>
                    <td>{ pokemon.battleStats.spd }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spd`} type="ev" bind:value={modifiedSpd} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spd`} type="iv" bind:value={pokemon.indivValues.spd} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Speed</td>
                    <td>{ pokemon.battleStats.spe }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spe`} type="ev" bind:value={modifiedSpe} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spe`} type="iv" bind:value={pokemon.indivValues.spe} /></td>
                </tr>
            </tbody>
        </table>

        <div class="mb-3">
            <label for={`${pokemon.id}-items`}>Held Item</label>
            <select id={`${pokemon.id}-items`} class="w-[125px]">
                <option value="" disabled selected class="text-zinc-500">Choose item</option>
                {#if items}
                    {#each items as i}
                    <option value={i[1].Index}>{ i[0] }</option>
                    {/each}
                {/if}
            </select>
        </div>
        <SheetClose>
            <button type="button" on:click={updateStore} class="border-2 border-white py-3 px-5">
                Save changes
            </button>
        </SheetClose>
    </SheetContent>
</Sheet>