import {prepareRexPlugin, randomNum} from "./common.js";

var player1;
var bomb;
var cursors;


export default class disasters extends Phaser.Scene {
    constructor() {
        super('disasters');
    }

    preload() {
        this.load.spritesheet('items', 'assets/mushroom.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});

        /*move to mouse*/
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js';
        this.load.plugin('rexmovetoplugin', url, true);
    }

    create() {

        this.add.image(400, 300, 'sky');
        const player1 = this.physics.add.sprite(200, 100, 'dude');
        player1.setBounce(0.2);
        player1.hp = 100;

        /*
            bomb.setCollideWorldBounds(true);
        */
        cursors = this.input.keyboard.createCursorKeys();

        /*wind*/
        let dot = this.physics.add.sprite(-randomNum(20, 20), randomNum(0, 600), 'bomb');
        dot.moveTo = prepareRexPlugin(this.plugins, dot);
        this.input.on('pointerdown', function () {
            //dot.moveTo.moveTo(randomNum(820, 820), randomNum(0, 600));
            dot.moveTo.moveTo(250, 100);
        });
        /*wind end*/

        this.physics.add.overlap(player1, dot, () => reduceHP(player1), null, this);

        function reduceHP(obj) {
            obj.hp = obj.hp - 1;
            // console.log(obj);
        }

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
        this.input.on('pointerdown', function () {

            this.cameras.main.shake(500, 0.02);

        }, this);

        var pointer = this.input.activePointer;
        /*add group mushroom*/
        this.mushroomGroup = this.add.group();
        /*create mooshroom*/
        this.input.on('pointerdown', function (pointer, gameObject) {
            console.log(gameObject);
            if (gameObject) {
                this.addShield()
            }
            this.createMushroom(pointer.x, pointer.y);
        }, this);
    }

    update() {

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

    createMushroom(x, y) {
        /*add click on sprite mushroom*/
        this.mushroom = this.physics.add.sprite(x, y, 'items', 2);
        this.mushroom.hp = 100;
        this.mushroom.inputEnable = true;
        this.mushroom.setInteractive();
        //
        // this.mushroom.on('pointerdown', (e) => {
        //     console.log(e);
        //     this.addShield();
        // });

        this.mushroomGroup.add(this.mushroom);
    }

    addShield() {
        console.log('SHIELD')
    }
}