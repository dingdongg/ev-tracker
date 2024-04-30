<script>
    export let name;
    export const NAME = name;

    export let points = 0;

    /**
     * @param {number} value
     */
    function updatePoints(value) {
        points = Math.min(255, points + value);
    }

    export function getPoints() {
        return points;
    }
</script>

<div class="flex flex-col m-4 text-2xl text-center">
    <p>{name}</p>
    <p>{points}</p>
    <button class="bg-slate-500 p-3 my-3" on:click={() => updatePoints(1)}>+ 1</button>
    <button class="bg-slate-600 p-3 my-3" on:click={() => updatePoints(2)}>+ 2</button>
    <button class="bg-slate-700 p-3 my-3" on:click={() => updatePoints(3)}>+ 3</button>
</div>