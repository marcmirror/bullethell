import { AreaComp, GameObj, PosComp, Vec2 } from "kaboom";
import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";

const SPEED = k.randi(55, 65);

export function Skull(player: GameObj<PosComp>, pos: Vec2): GameObj<PosComp | AreaComp> {
    const skull = k.make([
        k.sprite("skull"),
        k.pos(pos),
        k.rotate(0),
        k.area({
            scale: 0.7,
            collisionIgnore: [o.Wall, o.Arrow]
        }),
        k.body(),
        k.scale(1.5),
        k.anchor("center"),
        k.z(2),
        o.Skull,
        o.Enemy,
        "pauseAble"
    ]);

    skull.play("move");

    skull.onUpdate(() => {
        if (!player.exists()) {
            return;
        }

        let direction: Vec2;
        const bombs = k.get(o.ExplodingBomb);
        if (bombs.length !== 0) {
            const bomb: GameObj<PosComp> = bombs.pop();

            skull.flipX = bomb.pos.x < skull.pos.x;
            direction = bomb.pos.sub(skull.pos).unit();
        } else {
            skull.flipX = player.pos.x < skull.pos.x;
            direction = player.pos.sub(skull.pos).unit();
        }

        skull.move(direction.scale(SPEED));
    });

    return skull;
}
