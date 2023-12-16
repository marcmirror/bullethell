import k from "../../kaboom";
import Background from "./Background";
import { GameObj, TextComp } from "kaboom";
import { formatTime } from "../../utils/objectUtils";

export function Timer() {
    let secondsPlayed = 0;

    const timer: GameObj<TextComp> = k.add([
        k.pos(k.width() / 2, 10),
        k.text(formatTime(secondsPlayed), {
            size: 12,
            font: "PressStart2p",
        }),
        k.anchor("center"),
        k.fixed(),
        k.scale(1),
        k.z(100),
        "timer",
        "pauseAble"
    ]);

    timer.on("end", () => {
        timer.paused = true;

        const highscore = k.getData("highscore");
        if (secondsPlayed > highscore) {
            k.setData("highscore", secondsPlayed);
        }
    });

    k.loop(1, () => {
        if (!timer.paused) {
            timer.text = formatTime(++secondsPlayed);
        }
    });

    Background(timer as GameObj);

    return timer;
}
