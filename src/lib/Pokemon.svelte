<script>
    import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "$lib/components/ui/sheet";
    import { getContext } from "svelte";

    export let pokemon;

    const IMAGE_SIZE = 140;

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

    console.log(pokemon.effortValues);

    let modifiedHp = pokemon.effortValues.hp;
    let modifiedAtk = pokemon.effortValues.atk;
    let modifiedDef = pokemon.effortValues.def;
    let modifiedSpa = pokemon.effortValues.spa;
    let modifiedSpd = pokemon.effortValues.spd;
    let modifiedSpe = pokemon.effortValues.spe;

    const updateStore = () => {
        console.log("updating store");
        const newResults = [];

        for (const p of $ctx) {
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
        ctx.set(newResults);
    };
</script>

<Sheet>
    <SheetTrigger>
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
                        { pokemon.baseStats.hp }
                        (<span class={getColor(pokemon.effortValues.hp)}>+{ pokemon.effortValues.hp }</span>)
                    </p>
                    <p>
                        { pokemon.baseStats.atk }
                        (<span class={getColor(pokemon.effortValues.atk)}>+{ pokemon.effortValues.atk }</span>)
                    </p>
                    <p>
                        { pokemon.baseStats.def }
                        (<span class={getColor(pokemon.effortValues.def)}>+{ pokemon.effortValues.def }</span>)
                    </p>
                    <p>
                        { pokemon.baseStats.spa }
                        (<span class={getColor(pokemon.effortValues.spa)}>+{ pokemon.effortValues.spa }</span>)
                    </p>
                    <p>
                        { pokemon.baseStats.spd }
                        (<span class={getColor(pokemon.effortValues.spd)}>+{ pokemon.effortValues.spd }</span>)
                    </p>
                    <p>
                        { pokemon.baseStats.spe }
                        (<span class={getColor(pokemon.effortValues.spe)}>+{ pokemon.effortValues.spe }</span>)
                    </p>
                </div>
            </div>
        </div>
    </SheetTrigger>
    <SheetContent>
        <SheetTitle class="mb-5">{ pokemon.name } - Edit EVs</SheetTitle>

        <div class="mb-3">
            <label for={`${pokemon.id}-hp`}>HP EVs</label>
            <input id={`${pokemon.id}-hp`} bind:value={modifiedHp} type="number" min="0" max="255" />
        </div>
        <div class="mb-3">
            <label for={`${pokemon.id}-atk`}>Attack EVs</label>
            <input id={`${pokemon.id}-atk`} bind:value={modifiedAtk} type="number" min="0" max="255" />
        </div>
        <div class="mb-3">
            <label for={`${pokemon.id}-def`}>Defense EVs</label>
            <input id={`${pokemon.id}-def`} bind:value={modifiedDef} type="number" min="0" max="255" />
        </div>
        <div class="mb-3">
            <label for={`${pokemon.id}-spa`}>Special Attack EVs</label>
            <input id={`${pokemon.id}-spa`} bind:value={modifiedSpa} type="number" min="0" max="255" />
        </div>
        <div class="mb-3">
            <label for={`${pokemon.id}-spd`}>Special Defense EVs</label>
            <input id={`${pokemon.id}-spd`} bind:value={modifiedSpd} type="number" min="0" max="255" />
        </div>
        <div class="mb-3">
            <label for={`${pokemon.id}-spe`}>Speed EVs</label>
            <input id={`${pokemon.id}-spe`} bind:value={modifiedSpe} type="number" min="0" max="255" />
        </div>
        <SheetClose><button type="button" on:click={updateStore} class="border-2 border-white py-3 px-5">submit</button></SheetClose>
    </SheetContent>
</Sheet>