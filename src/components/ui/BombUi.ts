import k from "../../kaboom";
import Background from "./Background";
import { GameObj } from "kaboom";

export function BombUi(index: number): void {
    const bomb: GameObj = k.add([
        k.sprite("bomb"),
        k.scale(0.5),
        k.pos(20 * index, 35),
        k.fixed(),
        k.anchor("center"),
        k.z(100),
        "bombUi"
    ]);

    Background(bomb);
}
