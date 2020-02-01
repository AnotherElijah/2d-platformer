import {prepareRexPlugin, randomNum} from './common.js';
import disasters from "./disasters.js";


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //масштабирование
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:0},
            debug: false
        }
    },
    backgroundColor: '#eee',
    scene: [disasters],
    pixelArt: true,
    zoom: 2
};
let game = new Phaser.Game(config);