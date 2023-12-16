import k from "../../kaboom";

/**
 * A generic button.
 */
export default function Button(text: string, options: { size: number }) {
    const btn = k.add([
        k.rect(k.width() / 8, k.height() / 8),
        k.pos(k.center()),
        k.area(),
        k.scale(1),
        k.anchor("center"),
        k.outline(2),
        k.color(32, 156, 238),
    ]);

    btn.add([
        k.text(text, {
            font: "PressStart2p",
            ...options
        }),
        k.anchor("center"),
        k.color(255, 255, 255),
    ]);

    btn.onHoverUpdate(() => {
        btn.scale = k.vec2(1.1);
        k.setCursor("pointer");
    });

    btn.onHoverEnd(() => {
        btn.scale = k.vec2(1);
        k.setCursor("default");
    });

    return btn;
}
