import k from "./kaboom";
import { Game } from "./scenes/Game";
import { Menu } from "./scenes/Menu";

init();

function init(): void {
    loadSprites();
    loadMusic();
    loadFonts();
    loadShaders();

    k.scene("game", Game);
    k.scene("menu", Menu);

    k.go("menu");
}

function loadFonts(): void {
    k.loadFont("PressStart2p", "fonts/PressStart2P-Regular.ttf");
}

function loadMusic(): void {
    k.loadSound("battle", "sound/battle.wav");
    k.loadSound("menu", "sound/menu.wav");
    k.loadSound("damage", "sound/damage.ogg");
    k.loadSound("death", "sound/death.wav");
    k.loadSound("burning-fuse", "sound/burning-fuse.wav");
    k.loadSound("match-strike", "sound/match-strike.wav");
    k.loadSound("health-pickup", "sound/health-pickup.wav");
    k.loadSound("bomb-pickup", "sound/bomb-pickup.wav");
    k.loadSound("explosion", "sound/explosion.wav");
    k.loadSound("sneakers-pickup", "sound/sneakers-pickup.wav");
    k.loadSound("swoosh", "sound/swoosh.wav");
}

function loadSprites(): void {
    k.loadSprite("player", "sprites/spritesheet/kid-male-spritesheet.png", {
        sliceX: 12,
        anims: {
            "idle": {
                from: 0,
                to: 5,
                loop: true
            },
            "move": {
                from: 6,
                to: 11,
                loop: true
            }
        }
    });

    k.loadSprite("skull", "sprites/spritesheet/skull-v2-spritesheet.png", {
        sliceX: 4,
        anims: {
            "move": {
                from: 0,
                to: 3,
                loop: true
            }
        }
    });

    k.loadSprite("baseball_bat", "sprites/spritesheet/bat-swing-spritesheet.png", {
        sliceX: 3,
        anims: {
            "swing": {
                from: 0,
                to: 2,
                loop: false
            }
        }
    });

    k.loadSprite("torch_front", "sprites/spritesheet/torch-1-spritesheet.png", {
        sliceX: 4,
        anims: {
            "burn": {
                from: 0,
                to: 3,
                loop: true
            }
        }
    });

    k.loadSprite("health_flask", "sprites/spritesheet/flask-health-spritesheet.png", {
        sliceX: 4,
        anims: {
            "hover": {
                from: 0,
                to: 3,
                loop: true,
                speed: 3
            }
        }
    });

    k.loadSprite("spears", "sprites/spritesheet/spears-spritesheet.png", {
        sliceX: 4,
        anims: {
            "peak": {
                from: 0,
                to: 3,
                loop: true,
                speed: 3
            }
        }
    });

    k.loadSprite("exploding_bomb", "sprites/spritesheet/bomb-spritesheet.png", {
        sliceX: 40,
        anims: {
            "explode": {
                from: 0,
                to: 39,
                loop: false,
            }
        }
    });

    k.loadSprite("lava", "sprites/spritesheet/lava-spritesheet.png", {
        sliceX: 45,
        anims: {
            "flow": {
                from: 0,
                to: 44,
                loop: true,
            }
        }
    });

    k.loadSprite("wall_bottom_arrow", "sprites/wall-bottom-arrow.png");
    k.loadSprite("arrow", "sprites/arrow.png");
    k.loadSprite("bomb", "sprites/bomb.png");
    k.loadSprite("sneakers", "sprites/sneakers.png");
    k.loadSprite("hole", "sprites/hole.png");

    k.loadSpriteAtlas("sprites/dungeon-tileset.png", "sprites/dungeonTileset.json");
    k.loadSpriteAtlas("sprites/dungeon-ui-tileset.png", "sprites/dungeonUiTileset.json");
}

function loadShaders() {
    k.loadShader("crt", undefined, `
uniform float u_flatness;
uniform float u_scanline_height;
uniform float u_screen_height;

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	vec2 center = vec2(0.5, 0.5);
	vec2 off_center = uv - center;
	vec2 uv2 = center + off_center;
	if (uv2.x > 1.0 || uv2.x < 0.0 || uv2.y > 1.0 || uv2.y < 0.0) {
		return vec4(0.0, 0.0, 0.0, 1.0);
	} else {
		vec4 c = vec4(texture2D(tex, uv2).rgb, 1.0);
		float fv = fract(uv2.y * 120.0);
		fv = min(1.0, 0.8 + 0.5 * min(fv, 1.0 - fv));
		c.rgb *= fv;
		return c;
	}
}
`);

    k.usePostEffect("crt");
}
