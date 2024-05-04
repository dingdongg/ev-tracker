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
    let delta = 0;

    /**
     * @param {number} value
     */
    export function updatePoints(value) {
        points = Math.min(255, points + value);
        delta = Math.max(0, delta + value);

        if (value > 0) {
            actions.push({ stat: name, value });
        }

        console.log(actions);
    }

    export function getPoints() {
        return points;
    }

    export function resetAfterSave() {
        delta = 0;
    }
</script>

<div class={"flex flex-col m-4 text-2xl text-center p-3" + ` ${backgroundMap.get(name)}`}>
    <p>{name}</p>
    <p>{points} <span>{delta > 0 ? `(+ ${delta})` : ""}</span></p>
    <button class="bg-slate-500 p-3 my-3" on:click={() => updatePoints(1)}>+ 1</button>
    <button class="bg-slate-600 p-3 my-3" on:click={() => updatePoints(2)}>+ 2</button>
    <button class="bg-slate-700 p-3 my-3" on:click={() => updatePoints(3)}>+ 3</button>
</div>