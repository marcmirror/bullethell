import k from "../../kaboom";

const Y_OFFSET = k.height() / 4;

export function TextBelow(text: string, tag: string): void {
    const textObj = k.add([
        k.pos(k.camPos().add(0, Y_OFFSET)),
        k.text(text, {
            size: 12,
            font: "PressStart2p",
        }),
        k.anchor("center"),
        k.lifespan(5, {
            fade: 5
        }),
        k.z(100),
        "txtBelow",
        tag
    ]);


    textObj.onUpdate(() => {
        textObj.pos = k.camPos().add(0, Y_OFFSET);
    })
}
