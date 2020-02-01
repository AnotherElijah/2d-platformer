import {prepareRexPlugin, randomNum} from "./common.js";

var player1;
var bomb;
var cursors;
var mushroom;
var cdInfo;
let world;

export default class mainScene extends Phaser.Scene {
    constructor() {
        super('mainScene');
    }

    IDitemOfArr(arr){
        return arr.length? arr.length+1: 1;
    }

    createMushroom(e) {
            mushroom = this.physics.add.sprite(e.x, e.y, 'items', 2);
            mushroom.hp = 100;
            mushroom.id = this.IDitemOfArr(this.state.mushrooms);
            mushroom.inputEnable = true;
            mushroom.setInteractive();

            this.mushroomGroup.add(mushroom);
            this.state.mushroomCD.cd = this.state.mushroomCD.wait;
            this.state.mushrooms.push(mushroom);

            console.log(this.state);
    }

    checkCD(cd, createFunc){
        if (cd===0){
            createFunc();
        }
    }

    updateCd(step = 1){
        if(this.state.mushroomCD.cd!==0){
            this.state.mushroomCD.cd -= step;
        }
    }

    reduceHP(obj) {
        obj.hp = obj.hp - 1;
    }

    state = {};

    preload() {
        this.load.spritesheet('items', 'assets/mushroom.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});

        this.state = {
            mushroomCD: {
                cd: 2,
                wait: 2
            },
            mushrooms: []
        };

        /*move to mouse*/
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js';
        this.load.plugin('rexmovetoplugin', url, true);
    }

    create() {

        world = this.add.image(400, 300, 'sky').setInteractive();
        const player1 = this.physics.add.sprite(200, 100, 'dude');
        player1.setBounce(0.2);
        player1.hp = 100;

        /*
            bomb.setCollideWorldBounds(true);
        */
        cursors = this.input.keyboard.createCursorKeys();

        /*text*/
        cdInfo = this.add.text(100, 100, this.state.mushroomCD.cd);
        /*text-end*/

        /*wind*/
        let dot = this.physics.add.sprite(-randomNum(20, 20), randomNum(0, 600), 'bomb');
        dot.moveTo = prepareRexPlugin(this.plugins, dot);
        this.input.on('pointerdown', function (e) {
            //dot.moveTo.moveTo(randomNum(820, 820), randomNum(0, 600));
            dot.moveTo.moveTo(250, 100);
        });
        /*wind end*/

        this.physics.add.overlap(player1, dot, () => this.reduceHP(player1), null, this);

        /*meteor rain*/
        let createPoint = (x = randomNum(30, 770), y = randomNum(30, 570)) => {
            this.physics.add.sprite(x, y, 'star');
        };
        let fewObjects = (objCreator, num) => {
            for (let i = 0; i < num; i++) {
                objCreator();
            }
        };
        fewObjects(createPoint, 1);

        /*shake*/
        /*this.input.on('pointerdown', function () {

            this.cameras.main.shake(500, 0.02);

        }, this);*/

        var pointer = this.input.activePointer;
        /*add group mushroom*/
        this.mushroomGroup = this.add.group();
        /*create mooshroom*/
        this.input.on('pointerdown', function (e, gameObject) {
            console.log(gameObject);
            if (gameObject) {
                this.addShield()
            }
            this.checkCD(this.state.mushroomCD.cd, ()=>this.createMushroom(e));
        }, this);

        let timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateCd, callbackScope: this, loop: true });

    }

    update() {

        /*panel*/
        cdInfo.setText('Next mushroom: \n' + this.state.mushroomCD.cd);
        /*panel-end*/
        /*    if (cursors.left.isDown) {
                player1.setVelocityX(-160);

                //player1.anims.play('left', true);
            } else if (cursors.right.isDown) {
                player1.moveTo(160);

                //player1.anims.play('right', true);
            } else {
                player1.setVelocityX(0);

            }

            if (cursors.up.isDown) {
                player1.setVelocityY(-330);
            }

            if (cursors.down.isDown) {
                player1.setVelocityY(330);
            }*/
    }



    addShield() {
        console.log('SHIELD')
    }
}