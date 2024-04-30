<script>
    export let pokemon;

</script>

<li class="m-3">
    <img src={pokemon.image} alt={pokemon.name} fetchpriority="high">
    <div class="flex justify-between">
        <p>{pokemon.hp}</p>
        <p>{pokemon.attack}</p>
        <p>{pokemon.defense}</p>
        <p>{pokemon["special-attack"]}</p>
        <p>{pokemon["special-defense"]}</p>
        <p>{pokemon.speed}</p>
    </div>
</li>