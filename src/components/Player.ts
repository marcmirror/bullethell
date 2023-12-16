import k from "../kaboom";
import { GameObj, HealthComp, MergeComps, PosComp, SpriteComp } from "kaboom";
import { GameObject as o } from "../utils/objectUtils";
import { Heart } from "./ui/Heart";
import { BaseballBat } from "./BaseballBat";
import { ExplodingBomb } from "./ExplodingBomb";

const SPEED_NORMAL = 120;
const SPEED_FAST = 200;
const MASS = 100;
const START_HEALTH = 3;
const DURATION_SPEED_BOOST = 5;

let SPEED_CURRENT = SPEED_NORMAL;

export function Player(): MergeComps<any> {
    const player = k.add([
        k.sprite("player"),
        k.anchor("center"),
        k.pos(k.center()),
        k.scale(0.8),
        k.area({
            scale: 0.6
        }),
        k.body({
            mass: MASS
        }),
        k.health(START_HEALTH),
        k.z(2),
        o.Player,
        "pauseAble"
    ]);

    addMovement(player);
    addShadow(player);
    handleHealth(player);

    player.onUpdate(() => {
        k.camPos(player.pos);
        player.flipX = k.mousePos().x < player.screenPos().x;
    });

    player.on("speedBoost", () => {
        SPEED_CURRENT = SPEED_FAST;

        k.wait(DURATION_SPEED_BOOST, () => {
            SPEED_CURRENT = SPEED_NORMAL;
        })
    });

    return (player as MergeComps<any>);
}

function handleHealth(player: MergeComps<HealthComp>) {
    for (let i = 1; i < player.hp() + 1; i++) {
        Heart(i);
    }

    player.onHurt(amount => {
        k.shake(5);

        if (player.hp() > 0) {
            k.play("damage");
        }

        const hearts = k.get("heart");
        for (let i = 1; i < amount + 1; i++) {
            hearts.pop()?.destroy();
        }
    });

    player.onHeal(() => {
        k.play("health-pickup");
    });
}

function addShadow(player: GameObj<PosComp>): void {
    const playerShadow = k.add([
        k.circle(6),
        k.pos(),
        k.color(k.rgb(0, 0, 0)),
        k.opacity(0.25),
        k.anchor("top")
    ]);

    playerShadow.onUpdate(() => {
        if (!player.exists()) {
            playerShadow.destroy();
        }

        playerShadow.pos = k.vec2(player.pos.x, player.pos.y + 5);
    });
}

function addMovement(player: GameObj<PosComp | SpriteComp | HealthComp>): void {
    player.play("idle");

    k.onKeyDown(key => {
        if (!player.paused) {
            if (key === "a") {
                player.move(-SPEED_CURRENT, 0);
            }

            if (key === "d") {
                player.move(SPEED_CURRENT, 0);
            }

            if (key === "w") {
                player.move(0, -SPEED_CURRENT);
            }

            if (key === "s") {
                player.move(0, SPEED_CURRENT);
            }

            // todo: wird zz. bei jedem key ausgeführt
            if (player.curAnim() !== "move") {
                player.play("move");
            }
        }
    });

    k.onKeyRelease(() => {
        if (!k.isKeyDown()) {
            player.move(0, 0);
        }
    });

    ["left", "right", "up", "down"].forEach(() => {
        k.onKeyRelease(key => {
            if (!k.isKeyDown(key) && player.curAnim() !== "idle") {
                player.play("idle");
            }
        });
    });

    k.onKeyRelease("space", () => {
        if (!player.paused) {
            const playerHasBombs = k.get(o.BombUi).length > 0;
            const noExplodingBombs = k.get(o.ExplodingBomb).length === 0;

            if (playerHasBombs && noExplodingBombs) {
                ExplodingBomb(player);
                k.get(o.BombUi).pop()?.destroy();
            }
        }
    });

    let baseballBat;
    k.onClick(() => {
        if (!player.paused && (!baseballBat?.exists())) {
            baseballBat = BaseballBat(player);
        }
    });
}
