import k from "../../kaboom";
import Background from "./Background";
import { GameObj } from "kaboom";

export function Heart(index: number): void {
    const heart: GameObj = k.add([
        k.sprite("heart"),
        k.scale(0.5),
        k.pos(20 * index, 15),
        k.fixed(),
        k.anchor("center"),
        k.z(100),
        "heart"
    ]);

    Background(heart);
}
