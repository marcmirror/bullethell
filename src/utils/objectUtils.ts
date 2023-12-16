/**
 * Custom game objects.
 */
export enum GameObject {
    // Objects with collision
    Player = "player",
    Skull = "skull",
    Arrow = "arrow",
    Enemy = "enemy",
    Wall = "wall",
    BaseballBat = "baseballBat",
    HealthFlask = "healthFlask",
    Bomb = "bomb",
    ExplodingBomb = "explodingBomb",
    Sneakers = "sneakers",
    Lava = "lava",

    // UI Objects
    BombUi = "bombUi",
    TxtBelow = "txtBelow",
}

export function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
