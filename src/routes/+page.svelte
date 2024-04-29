<script>
    import Stat from "$lib/Stat.svelte";

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
    <Stat name='HP' bind:this={hpStat}></Stat>
    <Stat name='ATTACK' bind:this={atkStat}></Stat>
    <Stat name='DEFENSE' bind:this={defStat}></Stat>
    <Stat name='SP. ATTACK' bind:this={spaStat}></Stat>
    <Stat name='SP. DEFENSE' bind:this={spdStat}></Stat>
    <Stat name='SPEED' bind:this={speStat}></Stat>
</div>

<button class="m-4 bg-green-800 p-4" on:click={saveToDB}>save to database</button>

