import { MergeComps } from "kaboom";
import k from "../../kaboom";

export default function Background(other: MergeComps<any>) {
    const background = k.add([
        k.rect(other.width * 1.2, other.height * 1.2, {
            radius: 4
        }),
        k.pos(other.pos),
        k.opacity(0.3),
        k.fixed(),
        k.scale(other.scale),
        k.anchor("center"),
        k.outline(3),
        k.z(other.z - 1)
    ]);

    other.onDestroy(() => {
        background.destroy();
    })
}
