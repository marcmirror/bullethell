import k from "../kaboom";
import { GameObj, PosComp, SpriteComp } from "kaboom";
import { GameObject as o } from "../utils/objectUtils";

export function BaseballBat(player: GameObj<PosComp | SpriteComp>): GameObj<PosComp | SpriteComp> {
    const ignoreCollisionsWithObjects = [
        o.Player,
        o.BaseballBat,
        o.Wall,
        o.Enemy,
    ];

    const anglePlayerMouse = player.pos.angle(k.toWorld(k.mousePos()));
    const lookingUp = 30 < anglePlayerMouse && anglePlayerMouse < 130;
    const lookingDown = -30 > anglePlayerMouse && anglePlayerMouse > -130;

    const spriteAngle = (lookingDown ? 90 : 0) + (lookingUp ? 270 : 0);

    const baseballBat = k.add([
        k.sprite("baseball_bat"),
        k.scale(0.5),
        k.pos(),
        k.rotate(spriteAngle),
        k.body(),
        k.anchor("center"),
        k.area({
            collisionIgnore: ignoreCollisionsWithObjects
        }),
        o.BaseballBat,
        "pauseAble"
    ]);

    if (lookingUp || lookingDown) {
        baseballBat.anchor = "left";
    } else {
        baseballBat.flipX = player.flipX;
        baseballBat.anchor = player.flipX ? "right" : "left";
    }

    baseballBat.onAnimStart(() => {
        ignoreCollisionsWithObjects.pop();
        baseballBat.collisionIgnore = ignoreCollisionsWithObjects;
    });

    baseballBat.onAnimEnd(() => {
        ignoreCollisionsWithObjects.push(o.Enemy);
        baseballBat.collisionIgnore = ignoreCollisionsWithObjects;

        baseballBat.destroy();
    });

    k.onClick(() => {
        if (!baseballBat.curAnim() && !baseballBat.paused) {
            baseballBat.play("swing");
        }
    });

    baseballBat.onUpdate(() => {
        baseballBat.pos = k.vec2(player.pos.x, player.pos.y);

        if (!player.exists()) {
            baseballBat.destroy();
        }
    });

    return baseballBat;
}
