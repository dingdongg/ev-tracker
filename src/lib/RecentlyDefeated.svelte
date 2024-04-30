<script>
    import { ATTACK, DEFENSE, HEALTH, SPECIAL_ATTACK, SPECIAL_DEFENSE, SPEED, backgroundMap } from "./constants";

    export let pokemon;
    export let onClick;

</script>

<style>
    p {
        font-size: xx-large;
        color: black;
        padding: 3px;
    }
</style>

<li>
    <button type="button" on:click={onClick} class="m-3 hover:bg-slate-800 transition-colors flex flex-col items-center">
        <img src={pokemon.image} alt={pokemon.name} fetchpriority="high" width='125'>
        <div class="flex justify-between">
            <p class={backgroundMap.get(HEALTH)}>{pokemon.hp}</p>
            <p class={backgroundMap.get(ATTACK)}>{pokemon.attack}</p>
            <p class={backgroundMap.get(DEFENSE)}>{pokemon.defense}</p>
            <p class={backgroundMap.get(SPECIAL_ATTACK)}>{pokemon["special-attack"]}</p>
            <p class={backgroundMap.get(SPECIAL_DEFENSE)}>{pokemon["special-defense"]}</p>
            <p class={backgroundMap.get(SPEED)}>{pokemon.speed}</p>
        </div>
    </button>
</li>