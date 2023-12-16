import { GameObj, LevelComp } from "kaboom";
import k from "../kaboom";

/**
 * Returns a position ({@link Vec2}) to the left or to the right side of the level.
 */

export const leftRightPos = (level: GameObj<LevelComp>) => {
    const xPosLeft = k.randi(-100, -20);
    const xPosRight = k.randi(level.levelWidth() + 20, level.levelWidth() + 100);
    const xPos = k.choose([xPosLeft, xPosRight]);
    const yPos = k.randi(level.levelHeight() - 100, level.levelHeight() + 100);

    return k.vec2(xPos, yPos);
}

/**
 * Returns a position ({@link Vec2}) above or below the level.
 */
export const topBottomPos = (level: GameObj<LevelComp>) => {
    const yPosTop = k.randi(-20, -100);
    const yPosBottom = k.randi(level.levelHeight() + 20, level.levelHeight() + 100);
    const yPos = k.choose([yPosTop, yPosBottom]);
    const xPos = k.randi(-20, level.levelWidth() + 20);

    return k.vec2(xPos, yPos);
}

/**
 * Returns a random position ({@link Vec2}) in the level which is not already occupied by a game object.
 */
export const getRandomEmptyPositionInLevel = (level: GameObj<LevelComp>) => {
    const widthMargin = level.tileWidth() * 2;
    const heightMargin = level.tileHeight() * 2;

    let xPos = 0;
    let yPos = 0;
    while (level.getAt(k.vec2(xPos, yPos)).length !== 0) {
        xPos = k.randi(widthMargin, level.levelWidth() - widthMargin);
        yPos = k.randi(heightMargin, level.levelHeight() - heightMargin);
    }

    return k.vec2(xPos, yPos);
}
