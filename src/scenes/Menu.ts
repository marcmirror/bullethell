import k from "../kaboom";
import Button from "../components/ui/Button";
import { formatTime } from "../utils/objectUtils";

export function Menu(): void {
    k.setBackground(255, 255, 255);
    const backgroundMusic = k.play("menu", {
        loop: true,
        volume: 0.2,
    });

    const startButton = Button("START", { size: 12 });

    const highscore = k.getData("highscore");
    if (highscore) {
        k.add([
            k.text(`Highscore: ${formatTime(highscore)}`, {
                size: 14,
                font: "PressStart2p",
                align: "center"
            }),
            k.pos(k.vec2(startButton.pos.x, startButton.pos.y - 80)),
            k.anchor("center"),
            k.color(0, 0, 0)
        ]);
    } else {
        k.setData("highscore", 0);
    }

    const movementText = k.add([
        k.text("Movement", {
            size: 12,
            font: "PressStart2p",
            align: "center"
        }),
        k.pos(k.vec2(startButton.pos.x, startButton.pos.y + 60)),
        k.anchor("center"),
        k.color(0, 0, 0),
    ]);

    k.add([
        k.text(`
w = UP
a = LEFT
s = DOWN
d = RIGHT

Mouse Click = ATTACK
Space = DROP BOMB
p = PAUSE
        `, {
            size: 8,
            font: "PressStart2p",
            align: "center"
        }),
        k.pos(k.vec2(movementText.pos.x, movementText.pos.y + 50)),
        k.anchor("center"),
        k.color(0, 0, 0),
    ]);

    startButton.onClick(() => {
        backgroundMusic.stop();
        k.go("game");
    });
}
