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