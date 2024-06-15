<script>
    import { getContext } from "svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import NumberInput from "./NumberInput.svelte";
    import { PARTY_POKEMON_CONTEXT } from "$lib/constants";

    export let pokemon;
    export let index;

    const IMAGE_SIZE = 140;

    const items = getContext("items");
    const abilities = getContext("abilities");

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

    const ctx = getContext(PARTY_POKEMON_CONTEXT);

    let modifiedHpEV = pokemon.effortValues.hp;
    let modifiedAtkEV = pokemon.effortValues.atk;
    let modifiedDefEV = pokemon.effortValues.def;
    let modifiedSpaEV = pokemon.effortValues.spa;
    let modifiedSpdEV = pokemon.effortValues.spd;
    let modifiedSpeEV = pokemon.effortValues.spe;

    let modifiedHpIV = pokemon.indivValues.hp;
    let modifiedAtkIV = pokemon.indivValues.atk;
    let modifiedDefIV = pokemon.indivValues.def;
    let modifiedSpaIV = pokemon.indivValues.spa;
    let modifiedSpdIV = pokemon.indivValues.spd;
    let modifiedSpeIV = pokemon.indivValues.spe;

    let modifiedAbility = pokemon.ability;
    let modifiedItem = pokemon.heldItem;
    let modifiedLevel = pokemon.level;
    let modifiedName = pokemon.name;

    const resetForm = () => {
        console.log("resetting....");
        modifiedHpEV = pokemon.effortValues.hp;
        modifiedAtkEV = pokemon.effortValues.atk;
        modifiedDefEV = pokemon.effortValues.def;
        modifiedSpaEV = pokemon.effortValues.spa;
        modifiedSpdEV = pokemon.effortValues.spd;
        modifiedSpeEV = pokemon.effortValues.spe;

        modifiedHpIV = pokemon.indivValues.hp;
        modifiedAtkIV = pokemon.indivValues.atk;
        modifiedDefIV = pokemon.indivValues.def;
        modifiedSpaIV = pokemon.indivValues.spa;
        modifiedSpdIV = pokemon.indivValues.spd;
        modifiedSpeIV = pokemon.indivValues.spe;

        modifiedAbility = pokemon.ability;
        modifiedItem = pokemon.heldItem;
        modifiedLevel = pokemon.level;
        modifiedName = pokemon.name;
    };

    const updateStore = () => {
        console.log("updating store");
        const newResults = [];

        for (const p of $ctx.data) {
            console.log(p);
            const newP = JSON.parse(JSON.stringify(p));
            if (newP.id === pokemon.id) {
                newP.effortValues = {
                    hp: modifiedHpEV,
                    atk: modifiedAtkEV,
                    def: modifiedDefEV,
                    spa: modifiedSpaEV,
                    spd: modifiedSpdEV,
                    spe: modifiedSpeEV,
                };

                newP.indivValues = {
                    hp: modifiedHpIV,
                    atk: modifiedAtkIV,
                    def: modifiedDefIV,
                    spa: modifiedSpaIV,
                    spd: modifiedSpdIV,
                    spe: modifiedSpeIV,
                }

                newP.level = modifiedLevel;
                newP.ability = modifiedAbility;
                newP.heldItem = modifiedItem;
                newP.name = modifiedName;
            }
            newResults.push(newP);
        }
        console.log(newResults);
        console.log(ctx);
        ctx.set({ data: newResults });
    };
</script>

<Dialog.Root onOutsideClick={resetForm}>
    <Dialog.Trigger>
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
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>{ pokemon.name } - Edit Info</Dialog.Title>
        </Dialog.Header>
        <table class="text-lg border-separate border-spacing-y-2">
            <thead class="text-center border-b-2 border-zinc-500">
                <tr>
                    <th></th>
                    <th class="pl-14">Value</th>
                    <th class="pl-14">EV</th>
                    <th class="pl-14">IV</th>
                </tr>
            </thead>
            <tbody class="text-right">
                <tr class="bg-zinc-800">
                    <td>HP</td>
                    <td>{ pokemon.battleStats.hp }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-hp`} type="ev" bind:value={modifiedHpEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-hp`} type="iv" bind:value={modifiedHpIV} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Attack</td>
                    <td>{ pokemon.battleStats.atk }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-atk`} type="ev" bind:value={modifiedAtkEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-atk`} type="iv" bind:value={modifiedAtkIV} /></td>
                </tr>
                <tr class="bg-zinc-800">
                    <td>Defense</td>
                    <td>{ pokemon.battleStats.def }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-def`} type="ev" bind:value={modifiedDefEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-def`} type="iv" bind:value={modifiedDefIV} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Sp. Atk</td>
                    <td>{ pokemon.battleStats.spa }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spa`} type="ev" bind:value={modifiedSpaEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spa`} type="iv" bind:value={modifiedSpaIV} /></td>
                </tr>
                <tr class="bg-zinc-800">
                    <td>Sp. Def</td>
                    <td>{ pokemon.battleStats.spd }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spd`} type="ev" bind:value={modifiedSpdEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spd`} type="iv" bind:value={modifiedSpdIV} /></td>
                </tr>
                <tr class="bg-zinc-900">
                    <td>Speed</td>
                    <td>{ pokemon.battleStats.spe }</td>
                    <td><NumberInput id={`${pokemon.id}-ev-spe`} type="ev" bind:value={modifiedSpeEV} /></td>
                    <td><NumberInput id={`${pokemon.id}-iv-spe`} type="iv" bind:value={modifiedSpeIV} /></td>
                </tr>
            </tbody>
        </table>
        <hr>
        <div class="flex justify-around">
            <div class="mb-3 flex flex-col">
                <label for={`${pokemon.id}-items`}>Held Item</label>
                <select id={`${pokemon.id}-items`} class="w-[150px] py-3 border-[1px] border-zinc-500 rounded-lg">
                    <option value="" disabled selected class="text-zinc-500">{ pokemon.heldItem }</option>
                    {#each $items as i}
                    <option value={i[1].Index}>{ i[0] }</option>
                    {/each}
                </select>
            </div>
            <div class="mb-3 flex flex-col">
                <label for={`${pokemon.id}-ability`}>Ability</label>
                <select id={`${pokemon.id}-ability`} class="w-[150px] pl-2 py-3 border-[1px] border-zinc-500 rounded-lg">
                    <option value="" disabled selected class="text-zinc-500">{ pokemon.ability }</option>
                    {#each $abilities as a}
                    <option value={a[1]}>{ a[0] }</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="flex justify-around">
            <div class="mb-3 flex flex-col flex-shrink">
                <label for={`${pokemon.id}-name`}>Nickname</label>
                <input
                    id={`${pokemon.id}-name`}
                    class="w-[125px] p-3 bg-zinc-900 border-[1px] bg-transparent border-zinc-500 rounded-xl"
                    type="text" bind:value={modifiedName} placeholder={pokemon.name}
                />
            </div>
            <div class="mb-3 flex flex-col">
                <label for={`${pokemon.id}-level`}>Level</label>
                <input
                    id={`${pokemon.id}-level`}
                    class="w-[125px] p-3 bg-zinc-900 border-[1px] bg-transparent border-zinc-500 rounded-xl"
                    type="number" min="1" max="100" bind:value={modifiedLevel}
                />
            </div>
        </div>
        <hr>
        <Dialog.Footer>
            <Dialog.Close>
                <button type="button" on:click={updateStore} class="border-2 border-white py-3 px-5">
                    Save changes
                </button>
            </Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
