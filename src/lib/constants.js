export const HEALTH = "HP";
export const ATTACK = "ATTACK";
export const DEFENSE = "DEFENSE";
export const SPECIAL_ATTACK = "SP. ATTACK";
export const SPECIAL_DEFENSE = "SP. DEFENSE";
export const SPEED = "SPEED";

/**
* @type {Map<string, string>}
*/
export const backgroundMap = new Map([
    [HEALTH, "bg-green-300"],
    [ATTACK, "bg-yellow-400"],
    [DEFENSE, "bg-orange-500"],
    [SPECIAL_ATTACK, "bg-blue-300"],
    [SPECIAL_DEFENSE, "bg-blue-600"],
    [SPEED, "bg-purple-300"],
]);

export const PARTY_POKEMON_CONTEXT = "partyPokemon";

const natures = [
    "Hardy", "Lonely", "Brave", "Adamant", "Naughty",   // attack
	"Bold",	"Docile", "Relaxed", "Impish", "Lax",       // defense
	"Timid", "Hasty", "Serious", "Jolly", "Naive",      // speed
	"Modest", "Mild", "Quiet", "Bashful", "Rash",       // sp. attack
	"Calm",	"Gentle", "Sassy", "Careful", "Quirky",     // sp. defense
];

function generateNatureMap() {
    const ret = new Map();

    for (let i = 0; i < natures.length; i++) {
        const boostStat = Math.floor(i / 5);
        const hinderStat = i % 5;

        /** @type {(0.9 | 1.0 | 1.1)[]} */
        const arr = new Array(5).fill(1);
        arr[boostStat] = 1.1;
        arr[hinderStat] = 0.9;
        ret.set(natures[i], arr);
    }

    return ret;
}

/**
 * @type {Map<string, (0.9 | 1.0 | 1.1)[]>}
 */
export const natureMap = generateNatureMap();