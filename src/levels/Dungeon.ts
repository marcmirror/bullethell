import { Comp, GameObj, LevelComp, MergeComps } from "kaboom";
import k from "../kaboom";
import { Arrow } from "../components/Arrow";
import { HealthFlask } from "../components/HealthFlask";
import { GameObject as o } from "../utils/objectUtils";
import Bomb from "../components/Bomb";
import { getRandomEmptyPositionInLevel } from "../utils/levelUtil";
import { Sneakers } from "../components/Sneakers";

const CHANCE_SPEAR_SPAWN = 0.5;

const WAIT_BEFORE_HEALTH_FLASK_SPAWN = 20;
const INTERVAL_HEALTH_FLASK_SPAWN = 60;
const MAX_HEALTH_FLASKS = 3;

const WAIT_BEFORE_BOMB_SPAWN = 60;
const INTERVAL_BOMB_SPAWN = 60;
const MAX_BOMBS = 3;

const WAIT_BEFORE_SNEAKERS_SPAWN = 30;
const INTERVAL_SNEAKERS_SPAWN = 45;
const MAX_SNEAKERS = 1;

const WAIT_BEFORE_ARROW_SPAWN = 3;

export enum ArrowDirection {
    "wallBottomArrow" = k.DOWN,
    "wallRightArrow" = k.RIGHT
}

export function Dungeon(): GameObj<LevelComp> {
    const map = [
        "ca        h             h             h             h         d",
        " g                                                             ",
        "                                                 -             ",
        "     n                                                         ",
        "                                          n                    ",
        "                                                               ",
        "               -                                               ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "             n                                   n             ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                 n                             ",
        "                                                               ",
        "                                                               ",
        "           n                                                   ",
        "                                                               ",
        "                             -                                 ",
        "                                                           n   ",
        "                                                               ",
        "                                                               ",
        "                                                               ",
        "                                n                              ",
        "                                                               ",
        "                                                               ",
        "   n                                               n           ",
        "                                                               ",
        "                                                               ",
        "                        n                                      ",
        "                                                               ",
        "eb                                                            f",
    ];

    addObstaclesToMap(map);

    const wallTop = (width: number): GameObj[Comp] => [
        k.sprite("wall_top", {
            frame: ~~k.rand(0, 4),
            tiled: true,
            width: width,
            height: 16
        }),
        k.body({ isStatic: true }),
        k.area(),
        "wall"
    ];

    const wallLeft = (height: number): GameObj[Comp] => [
        k.sprite("wall_left", {
            frame: ~~k.rand(0, 4),
            tiled: true,
            width: 16,
            height: height
        }),
        k.body({ isStatic: true }),
        k.area(),
        "wall"
    ];

    const wallBottom = (width: number): GameObj[Comp] => [
        k.sprite("wall_bottom", {
            frame: ~~k.rand(0, 4),
            tiled: true,
            width: width,
            height: 16
        }),
        k.body({ isStatic: true }),
        k.area(),
        "wall",
    ];

    const wallRight = (height: number): GameObj[Comp] => [
        k.sprite("wall_right", {
            frame: ~~k.rand(0, 4),
            tiled: true,
            width: 16,
            height: height
        }),
        k.body({ isStatic: true }),
        k.area(),
        "wall"
    ];

    const wallBottomLeft = (): GameObj[Comp] => [
        k.sprite("wall_bottom_left", { frame: 0 }),
        "wall"
    ];

    const wallBottomRight = (): GameObj[Comp] => [
        k.sprite("wall_bottom_right", { frame: 0 }),
        "wall"
    ];

    const wallBottomArrow = (): GameObj[Comp] => [
        k.sprite("wall_bottom_arrow", {
            tiled: true,
            width: 16,
            height: 16
        }),
        k.body({ isStatic: true }),
        k.area(),
        "wall",
        "wallBottomArrow"
    ];

    const spears = (): GameObj[Comp] => {
        if (k.chance(CHANCE_SPEAR_SPAWN)) {
            return [
                k.sprite("spears", { anim: "peak" }),
                k.area({ scale: 0.6 }),
                k.anchor("center"),
                "spears"
            ];
        } else {
            return null;
        }
    }

    const level = k.addLevel(map, {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            "a": () => wallTop(992),
            "b": () => wallBottom(976),
            "c": () => wallLeft(576),
            "d": () => wallRight(576),
            "e": () => wallBottomLeft(),
            "f": () => wallBottomRight(),
            "g": () => [
                k.sprite("floor", {
                    frame: 8,
                    tiled: true,
                    width: 976,
                    height: 560
                })
            ],
            "h": () => [
                k.sprite("torch_front", { anim: "burn" }),
            ],
            "j": () => wallTop(16),
            "k": () => wallLeft(32),
            "l": () => wallBottomArrow(),
            "m": () => [
                ...wallRight(32),
                "wallRightArrow"
            ],
            "n": () => spears(),
            "o": () => [
                k.sprite("lava", { anim: "flow" }),
            ],
        },
    });

    spawnHealthFlasks(level);
    spawnBombs(level);
    spawnSneakers(level);
    spawnArrows(level);

    return level;
}

/**
 * Replaces every instance of "-" on the map with:
 *
 * "kjm"
 * " o "
 * "elf"
 */
function addObstaclesToMap(map: string[]) {
    let rowIndexObstacleBottom;
    let rowIndexLava;
    let columnIndexToReplace;

    map.forEach((row, rowIndex) => {
        if (rowIndex === rowIndexLava) {
            const lava = "o";
            map[rowIndex] = row.substring(0, columnIndexToReplace + 1)
                + lava
                + row.substring(columnIndexToReplace + lava.length + 1);
        } else if (rowIndex === rowIndexObstacleBottom) {
            const obstacleBottom = "elf";
            map[rowIndex] = row.substring(0, columnIndexToReplace)
                + obstacleBottom
                + row.substring(columnIndexToReplace + obstacleBottom.length);
        } else {
            const columnIndex = row.indexOf("-");
            if (columnIndex !== -1) {
                map[rowIndex] = row.split("-  ").join("kjm");

                columnIndexToReplace = columnIndex;
                rowIndexLava = rowIndex + 1;
                rowIndexObstacleBottom = rowIndex + 2;
            }
        }
    });
}

/**
 * Spawns a {@link HealthFlask} every {@link INTERVAL_HEALTH_FLASK_SPAWN} seconds at a random place on the map until
 * the maximal amount ({@link MAX_HEALTH_FLASKS}) is reached.
 */
function spawnHealthFlasks(level: GameObj<LevelComp>) {
    k.wait(WAIT_BEFORE_HEALTH_FLASK_SPAWN, () => {
        k.loop(INTERVAL_HEALTH_FLASK_SPAWN, () => {
            if (!level.paused && level.get(o.HealthFlask).length < MAX_HEALTH_FLASKS) {
                level.add(HealthFlask(getRandomEmptyPositionInLevel(level)));
            }
        });
    });
}

/**
 * Spawns a {@link Bomb} every {@link INTERVAL_BOMB_SPAWN} seconds at a random place on the map until
 * the maximal amount ({@link MAX_BOMBS}) is reached.
 */
function spawnBombs(level: GameObj<LevelComp>) {
    k.wait(WAIT_BEFORE_BOMB_SPAWN, () => {
        k.loop(INTERVAL_BOMB_SPAWN, () => {
            if (!level.paused && level.get(o.Bomb).length + k.get(o.BombUi).length < MAX_BOMBS) {
                level.add(Bomb(getRandomEmptyPositionInLevel(level)));
            }
        });
    });
}

/**
 * Spawns {@link Sneakers} every {@link INTERVAL_SNEAKERS_SPAWN} seconds at a random place on the map until
 * the maximal amount ({@link MAX_SNEAKERS}) is reached.
 */
function spawnSneakers(level: GameObj<LevelComp>) {
    k.wait(WAIT_BEFORE_SNEAKERS_SPAWN, () => {
        k.loop(INTERVAL_SNEAKERS_SPAWN, () => {
            if (!level.paused && level.get(o.Sneakers).length < MAX_SNEAKERS) {
                level.add(Sneakers(getRandomEmptyPositionInLevel(level)));
            }
        });
    });
}

/**
 * Spawns {@link Arrow}s at random intervals.
 */
function spawnArrows(level: GameObj<LevelComp>) {
    const arrowDirectionKeys = Object.values(ArrowDirection)
        .filter(value => typeof value === 'string') as string[];

    arrowDirectionKeys.forEach(direction => {
        level.get(direction).forEach((wallArrow: MergeComps<any>) => {
            k.wait(WAIT_BEFORE_ARROW_SPAWN, () => {
                // Shoot each arrow in random interval
                k.loop(k.randi(3, 5), () => {
                    if (!level.paused) {
                        Arrow(wallArrow.pos.x as number, wallArrow.pos.y as number, ArrowDirection[direction]);
                    }
                });
            });
        });
    });
}
