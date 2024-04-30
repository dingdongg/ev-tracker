<script>
    import { backgroundMap } from "./constants";

    /**
     * @type {string}
     */
    export let name;
    export let points = 0;
    /**
     * @type {{ stat: string; value: number; }[]}
     */
    export let actions;

    /**
     * @param {number} value
     */
    export function updatePoints(value) {
        points = Math.min(255, points + value);

        if (value > 0) {
            actions.push({ stat: name, value });
        }

        console.log(actions);
    }

    export function getPoints() {
        return points;
    }
</script>

<div class={"flex flex-col m-4 text-2xl text-center p-3" + ` ${backgroundMap.get(name)}`}>
    <p>{name}</p>
    <p>{points}</p>
    <button class="bg-slate-500 p-3 my-3" on:click={() => updatePoints(1)}>+ 1</button>
    <button class="bg-slate-600 p-3 my-3" on:click={() => updatePoints(2)}>+ 2</button>
    <button class="bg-slate-700 p-3 my-3" on:click={() => updatePoints(3)}>+ 3</button>
</div>