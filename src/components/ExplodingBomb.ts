import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";
import { AudioPlay, GameObj, HealthComp, PosComp, SpriteComp } from "kaboom";
import { Lava } from "./Lava";

const EXPLOSION_DISTANCE_FAR = 120;
const EXPLOSION_DISTANCE_MEDIUM = 60;
const MASS = 100;

export function ExplodingBomb(player: GameObj<PosComp | SpriteComp | HealthComp>): void {
    const bomb = k.add([
        k.sprite("exploding_bomb"),
        k.pos(player.pos.x + (player.flipX ? -player.width / 2 : player.width / 2), player.pos.y),
        k.scale(0.8),
        k.body({
            mass: MASS
        }),
        k.area({
            collisionIgnore: [
                o.BaseballBat,
                o.Arrow
            ],
            scale: 0.5
        }),
        k.anchor("center"),
        o.ExplodingBomb,
        "pauseAble"
    ]);

    bomb.onAnimStart(() => {
        let burningFuseSound: AudioPlay;
        k.play("match-strike", {
            volume: 1.5
        }).onEnd(() => {
            burningFuseSound = k.play("burning-fuse", {
                volume: 1.5
            });
        })

        k.wait(3.8, () => {
            burningFuseSound.stop();

            k.shake(8);
            k.play("explosion", {
                volume: 0.4
            });

            // Make damage to enemies
            const skulls = k.get(o.Skull);
            skulls.forEach((skull: GameObj<PosComp>) => {
                if (bomb.pos.dist(skull.pos) <= EXPLOSION_DISTANCE_FAR) {
                    skull.destroy();
                }
            });

            // Make damage to player
            const distanceToPlayer = bomb.pos.dist(player.pos);
            if (distanceToPlayer <= EXPLOSION_DISTANCE_FAR && distanceToPlayer >= EXPLOSION_DISTANCE_MEDIUM) {
                player.hurt(2);
            } else if (distanceToPlayer < EXPLOSION_DISTANCE_MEDIUM) {
                player.hurt(player.maxHP());
            }

            Lava(bomb);
        })
    })

    bomb.onAnimEnd(() => {
        bomb.destroy();
    });

    if (!bomb.curAnim() && !bomb.paused) {
        bomb.play("explode");
    }
}
