# This is a read-only mirror of the git repo at https://codeberg.org/marc/bullethell

# Evils Of The Dungeon

*Evils Of The Dungeon* (EOTD) is a Bullet Hell game where you play a kid called Bobby. On his way home from baseball training, Bobby is sucked into a portal and wakes up in a dungeon where everything is out to get him. Luckily he has his trusty bat with him which helps him defend off the hordes of evil.

EOTD was created with [Kaboom](https://kaboomjs.com).

**[---> DEMO <---](https://marc.codeberg.page/bullethell)**

### Features

- Trying to kill you: Flying skulls, arrows and spears.
- Different items that spawn at random places on the map.
    - Sneakers: Run faster for a short amount of time.
    - Bomb: Blow up your enemies. But be aware, the bomb will leave a hole in the ground.
    - Health flask: Regain health.
- Try to survive as long as possible and beat your own highscore.
- Cool retro look and sounds.

### Movement

**w** = UP, **a** = LEFT, **s** = DOWN, **d** = RIGHT

**Mouse Click** = ATTACK, **Space** = DROP BOMB, **p** = PAUSE

## Folder structure

- `src` - source code
- `www` - distribution folder, contains your index.html, built js bundle and static assets

## Setup

### Prerequisites

Up-to-date *Node.js* and *npm* installation.

### Initial Setup

`npm install`

Will install all the required dependencies.

## Development

```sh
$ npm run dev
```

Will start a dev server at http://localhost:8000.

## Distribution

```sh
$ npm run build
```

Will build your js files into `www/main.js`.

```sh
$ npm run bundle
```

Will build the game and package it into a .zip file, which can then be uploaded or deployed etc.

## Third party assets

- [health-pickup.wav](https://freesound.org/people/KeshaFilm/sounds/471834/) (CC0 1.0)
- [menu.wav](https://freesound.org/people/Engie201/sounds/459152) (CC0 1.0)
- [bomb-spritesheet.png](https://opengameart.org/content/pixel-art-bomb-animation) (CC0 1.0)
- [hurt.ogg](https://freesound.org/people/micahlg/sounds/413183/) (CC0 1.0)
- [bomb-pickup.wav](https://freesound.org/people/el_boss/sounds/665182) (CC0 1.0)
- [damage.ogg](https://freesound.org/people/micahlg/sounds/413183/) (CC0 1.0)
- [death.wav](https://freesound.org/people/FunWithSound/sounds/394899) (CC BY 4.0)
- [burning-fuse.wav](https://freesound.org/people/Alex_hears_things/sounds/316682/) (CC0 1.0)
- [match-strike.wav](https://freesound.org/people/Bertsz/sounds/524306/) (CC0 1.0)
- [explosion.wav](https://freesound.org/people/steveygos93/sounds/80401/) (CC BY 3.0)
- [sneakers.png](https://eternalpixel.itch.io/3-air-jordans-free) (CC0 1.0)
- [sneakers-pickup.wav](https://freesound.org/people/colorsCrimsonTears/sounds/577965) (CC0 1.0)
- [lava-spritesheet.png](https://opengameart.org/content/16x16-and-animated-lava-tile-45-frames) (CC0 1.0)
- [swoosh.wav](https://freesound.org/people/s-cheremisinov/sounds/402183) (CC0 1.0)

## License

[AGPL v3](./LICENSE)
