import {prepareRexPlugin, randomNum} from './common.js';
import mainScene from "./main-scene.js";


let config = {
    type: Phaser.AUTO,
    width: 1248,
    height: 704,
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
    scene: [mainScene],
    pixelArt: true,
    zoom: 2
};
let game = new Phaser.Game(config);