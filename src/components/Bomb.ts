import { Vec2 } from "kaboom";
import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";

export default function Bomb(pos: Vec2) {
    return [
        k.sprite("bomb"),
        k.pos(pos),
        k.scale(0.8),
        k.tile({}),
        k.area({
            scale: 0.6,
            offset: k.vec2(-2, 6)
        }),
        k.anchor("center"),
        o.Bomb
    ];
}
