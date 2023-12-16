import k from "../../kaboom";

export function Pause() {
    const pauseMenu = k.add([
        k.pos(),
        k.text("PAUSED", {
            size: 18,
            font: "PressStart2p",
        }),
        k.anchor("center"),
        k.z(100),
    ]);

    pauseMenu.hidden = true;

    pauseMenu.on('paused', gamePaused => {
        pauseMenu.hidden = !gamePaused;
        pauseMenu.pos = k.toWorld(k.center());
    });

    return pauseMenu;
}
