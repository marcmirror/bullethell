import k from "../kaboom";
import { AreaComp, GameObj, LevelComp, MergeComps, PosComp } from "kaboom";
import { Dungeon } from "../levels/Dungeon";
import { Skull } from "../components/Skull";
import { Player } from "../components/Player";
import { Heart } from "../components/ui/Heart";
import { TextBelow } from "../components/ui/TextBelow";
import { Pause } from "../components/ui/Pause";
import { getRandomEmptyPositionInLevel, leftRightPos, topBottomPos } from "../utils/levelUtil";
import { GameObject as o } from "../utils/objectUtils";
import { BombUi } from "../components/ui/BombUi";
import { Timer } from "../components/ui/Timer";

let paused = false;
const MAX_BOMBS = 2;

export function Game(): void {
    k.setBackground(0, 0, 0);
    const backgroundMusic = k.play("battle", {
        loop: true
    });

    const level = Dungeon();
    const player = Player();

    k.loop(1, () => {
        if (!paused) {
            spawnSkull(level, player);
        }
    });

    handlePause(level);
    handleCollisions(player);
    const timer = Timer();

    player.onDeath(() => {
        backgroundMusic.stop();
        timer.trigger("end");

        const deathSound = k.play("death");

        deathSound.onEnd(() => {
            k.go("menu");
        })

        player.destroy();
    });

    player.pos = getRandomEmptyPositionInLevel(level);
}

function spawnSkull(level: GameObj<LevelComp>, playerObj: MergeComps<any>) {
    const skullPos = k.choose([() => leftRightPos(level), () => topBottomPos(level)]);

    const skull: GameObj<PosComp | AreaComp> = Skull(playerObj, skullPos());
    k.add(skull);

    skull.onCollide(o.BaseballBat, () => {
        k.play("swoosh", {
            volume: 0.5
        });
        skull.destroy();
    });
}

/**
 * Handles player collisions with various other game objects.
 */
function handleCollisions(player: MergeComps<any>) {
    player.onCollide(o.Skull, () => {
        player.hurt(1);
    });

    player.onCollide(o.Arrow, () => {
        player.hurt(2);
    });

    player.onCollide(o.Lava, () => {
        player.hurt(player.maxHP());
    });

    player.onCollide("spears", () => {
        player.hurt(player.maxHP());
    });

    player.onCollide(o.HealthFlask, flask => {
        if (player.hp() < 3) {
            Heart(player.hp() + 1);
            player.heal();
            flask.destroy();
        } else if (k.get("txtHealthFull").length === 0) {
            k.get(o.TxtBelow).pop()?.destroy();
            TextBelow("Full Health", "txtHealthFull");
        }
    });

    player.onCollide(o.Bomb, bomb => {
        const numberOfOwnedBombs = k.get(o.BombUi).length;
        if (numberOfOwnedBombs < MAX_BOMBS) {
            BombUi(numberOfOwnedBombs + 1);
            k.play("bomb-pickup");
            bomb.destroy();
        } else if (k.get("txtBombsFull").length === 0) {
            k.get(o.TxtBelow).pop()?.destroy();
            TextBelow("You can't carry more", "txtBombsFull");
        }
    });

    player.onCollide(o.Sneakers, sneakers => {
        k.play("sneakers-pickup");
        sneakers.destroy();
        player.trigger("speedBoost");
    });
}

function handlePause(level: GameObj<LevelComp>) {
    const pauseMenu = Pause();

    k.onKeyRelease("p", () => {
        paused = !paused;
        level.paused = paused;

        k.get("pauseAble").forEach((pauseAble) => {
            pauseAble.paused = paused;
        });

        pauseMenu.trigger("paused", paused as any);
    });
}
