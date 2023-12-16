import { Vec2 } from "kaboom";
import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";

export function HealthFlask(pos: Vec2) {
    return [
        k.sprite("health_flask", { anim: "hover" }),
        k.tile({}),
        k.scale(1.2),
        k.pos(pos),
        k.area({ scale: 0.6 }),
        k.anchor("center"),
        o.HealthFlask
    ];
}
