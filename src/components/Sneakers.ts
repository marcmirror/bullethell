import { Vec2 } from "kaboom";
import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";

export function Sneakers(pos: Vec2) {
    return [
        k.sprite("sneakers"),
        k.tile({}),
        k.pos(pos),
        k.scale(0.5),
        k.area(),
        k.anchor("center"),
        o.Sneakers
    ];
}
