import k from "../kaboom";
import { GameObject as o } from "../utils/objectUtils";
import { GameObj, PosComp } from "kaboom";

export function Lava(bomb: GameObj<PosComp>) {
    k.add([
        k.sprite("lava", { anim: "flow" }),
        k.pos(bomb.pos),
        k.anchor("center"),
        k.area({
            scale: 0.8
        }),
        o.Lava
    ]);

    k.add([
        k.sprite("hole"),
        k.pos(bomb.pos),
        k.anchor("center"),
    ]);
}
