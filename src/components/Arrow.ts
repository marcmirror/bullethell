import k from "../kaboom";
import { Vec2 } from "kaboom";
import { GameObject as o } from "../utils/objectUtils";

const X_OFFSET = 8;
const SPEED = k.randi(150, 200);

const directionRotate: Record<string, number> = {};
directionRotate[k.DOWN] = 0;
directionRotate[k.RIGHT] = 270;

const directionYPositionOffset: Record<string, number> = {};
directionYPositionOffset[k.DOWN] = 5;
directionYPositionOffset[k.RIGHT] = 20;

export function Arrow(xPos: number, yPos: number, direction: Vec2): void {
    k.add([
        k.sprite("arrow"),
        k.pos(xPos + X_OFFSET, yPos + directionYPositionOffset[direction]),
        k.scale(1.2),
        k.area({
            collisionIgnore: [
                o.Arrow,
                o.Wall,
                o.BaseballBat
            ],
            scale: 0.5
        }),
        k.rotate(directionRotate[direction]),
        k.z(2),
        k.anchor("center"),
        k.move(direction, SPEED),
        k.offscreen({ destroy: true }),
        o.Arrow,
        o.Enemy,
        "pauseAble"
    ]);
}
