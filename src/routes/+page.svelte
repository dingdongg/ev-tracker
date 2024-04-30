<script>
    import Stat from "$lib/Stat.svelte";
    import { onMount } from "svelte";
    import RecentlyDefeated from "$lib/RecentlyDefeated.svelte";
    import { HEALTH, ATTACK, DEFENSE, SPECIAL_ATTACK, SPECIAL_DEFENSE, SPEED } from "$lib/constants";

    /**
     * @type {{ stat: string; value: number; }[]}
     */
    const actions = [];

    /**
     * @type {{
     *      hp: number;
     *      attack: number;
     *      defense: number;
     *      "special-attack": number;
     *      "special-defense": number;
     *      speed: number;
     *      name: string;
     *      image: string;
     * }[]}
     */
    let recentlyDefeated = [];
    const recentlyDefeatedSet = new Set();

    let searchValue = "";

    /**
     * @type {{
     *      hp: number;
     *      atk: number;
     *      def: number;
     *      spa: number;
     *      spd: number;
     *      spe: number;
     *      name: string;
     *      id: string;
     * }}
     */
    let sneasel = {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0,
        name: "",
        id: "",
    };

    const init = async () => {
        const cache = localStorage.getItem("recentlyDefeated");
        if (cache !== null) {
            recentlyDefeated = JSON.parse(cache);
        }

        const res = await fetch("http://localhost:8080/get-pokemon?pokemon=sneasel");
        const body = await res.json();
        sneasel = body[0];
    }

    onMount(init);

    /**
     * @type {Stat}
     */
    let hpStat;
    /**
     * @type {Stat}
     */
    let atkStat;
    /**
     * @type {Stat}
     */
    let defStat;
    /**
     * @type {Stat}
     */
    let spaStat;
    /**
     * @type {Stat}
     */
    let spdStat;
    /**
     * @type {Stat}
     */
    let speStat;

    function undo() {
        const prevActions = actions.pop();

        if (prevActions) {
            const { stat, value } = prevActions;
            switch (stat) {
                case HEALTH: hpStat.updatePoints(value * -1); break;
                case ATTACK: atkStat.updatePoints(value * -1); break;
                case DEFENSE: defStat.updatePoints(value * -1); break;
                case SPECIAL_ATTACK: spaStat.updatePoints(value * -1); break;
                case SPECIAL_DEFENSE: spdStat.updatePoints(value * -1); break;
                case SPEED: speStat.updatePoints(value * -1); break;
                default: break;
            }
        }
    }

    async function saveToDB() {
        console.log("SAVING to DB");

        console.log("STATS:");

        const stats = [hpStat, atkStat, defStat, spaStat, spdStat, speStat];

        for (const stat of stats) {
            console.log(stat.NAME, stat.getPoints());
        }

        const res = await fetch("http://localhost:8080/update-pokemon", {
            method: "POST",
            body: JSON.stringify({
                Name: "sneasel",
                NewHp: hpStat.getPoints(),
                NewAtk: atkStat.getPoints(),
                NewDef: defStat.getPoints(),
                NewSpa: spaStat.getPoints(),
                NewSpd: spdStat.getPoints(),
                NewSpe: speStat.getPoints(),
            })
        });
        console.log(res);

        // purge recently defeated from localstorage cache
        // and reset to empty in memory
        recentlyDefeated = [];
        localStorage.removeItem("recentlyDefeated");
    }

    async function addToRecents() {
        console.log("adding", searchValue);
        if (!recentlyDefeatedSet.has(searchValue)) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
            const body = await res.json();

            // get sprite URL, name, and EV stats
            const pokemon = {
                image: body.sprites.front_default,
                name: body.name,
                hp: body.stats[0].effort,
                attack: body.stats[1].effort,
                defense: body.stats[2].effort,
                "special-attack": body.stats[3].effort,
                "special-defense": body.stats[4].effort,
                speed: body.stats[5].effort,
            }

            recentlyDefeatedSet.add(body.name);
            recentlyDefeated = recentlyDefeated.concat(pokemon);
            localStorage.setItem("recentlyDefeated", JSON.stringify(recentlyDefeated));
        }

        console.log(recentlyDefeated);
    }


    /**
     * @param {{
            image: string;
            name: string;
            hp: number;
            attack: number;
            defense: number;
            "special-attack": number;
            "special-defense": number;
            speed: number;
        }} pokemon
     */
    function updateStats(pokemon) {
        hpStat.updatePoints(pokemon.hp);
        atkStat.updatePoints(pokemon.attack);
        defStat.updatePoints(pokemon.defense);
        spaStat.updatePoints(pokemon["special-attack"]);
        spdStat.updatePoints(pokemon["special-defense"]);
        speStat.updatePoints(pokemon.speed);
    }
</script>

<h1>POKEMON EV TRACKER</h1>

<div class="m-4 flex p-5 justify-around">
    <Stat name={HEALTH} bind:this={hpStat} points={sneasel.hp} actions={actions}></Stat>
    <Stat name={ATTACK} bind:this={atkStat} points={sneasel.atk} actions={actions}></Stat>
    <Stat name={DEFENSE} bind:this={defStat} points={sneasel.def} actions={actions}></Stat>
    <Stat name={SPECIAL_ATTACK} bind:this={spaStat} points={sneasel.spa} actions={actions}></Stat>
    <Stat name={SPECIAL_DEFENSE} bind:this={spdStat} points={sneasel.spd} actions={actions}></Stat>
    <Stat name={SPEED} bind:this={speStat} points={sneasel.spe} actions={actions}></Stat>
</div>

<button class="m-4 bg-green-800 p-4" on:click={saveToDB}>save to database</button>
<button class="m-4 bg-blue-600 p-4" on:click={undo}>Undo previous action</button>

<input type="text" placeholder="Type pokemon name" class="p-4 border-2 mr-4" bind:value={searchValue} />
<button type="button" class="hover:bg-slate-600 p-4" on:click={addToRecents}>Search</button>

<p>Recently Defeated:</p>
<ul class="flex">
    {#each recentlyDefeated as pokemon (pokemon.name)}
        <RecentlyDefeated pokemon={pokemon} onClick={() => updateStats(pokemon)}></RecentlyDefeated>
    {/each}
</ul>

