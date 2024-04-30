<script>
    import Stat from "$lib/Stat.svelte";
    import { onMount } from "svelte";

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
        const res = await fetch("http://localhost:8080/get-pokemon?pokemon=sneasel");
        const body = await res.json();
        console.log(body);
        sneasel = body[0];
        console.log(sneasel);
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

    async function saveToDB() {
        console.log("SAVING to DB");

        console.log("STATS:");
        const stats = [hpStat, atkStat, defStat, spaStat, spdStat, speStat];

        for (const stat of stats) {
            console.log(stat.NAME, stat.getPoints());
        }

        const res = await fetch("http://localhost:8080/bar", {
            headers: {
                
            }
        });
        console.log(res);
    }

</script>

<h1>POKEMON EV TRACKER</h1>


<div class="m-4 flex p-5 justify-around">
    <Stat name='HP' bind:this={hpStat} points={sneasel.hp}></Stat>
    <Stat name='ATTACK' bind:this={atkStat} points={sneasel.atk}></Stat>
    <Stat name='DEFENSE' bind:this={defStat} points={sneasel.def}></Stat>
    <Stat name='SP. ATTACK' bind:this={spaStat} points={sneasel.spa}></Stat>
    <Stat name='SP. DEFENSE' bind:this={spdStat} points={sneasel.spd}></Stat>
    <Stat name='SPEED' bind:this={speStat} points={sneasel.spe}></Stat>
</div>

<button class="m-4 bg-green-800 p-4" on:click={saveToDB}>save to database</button>

