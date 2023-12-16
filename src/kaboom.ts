import kaboom, { KaboomCtx } from "kaboom";

const k: KaboomCtx = kaboom({
    background: [0, 0, 0],
    width: 640,
    height: 360,
    scale: 2,
    stretch: true,
    letterbox: true
});

export default k;
