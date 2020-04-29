var game;
var gameOptions = {

    // character gravity, will make character fall if you don't flap
    characterGravity: 800,

    // horizontal character speed
    characterSpeed: 125,

    // flap thrust
    characterFlapPower: 300,

    // minimum pipe height, in pixels. Affects hole position
    minPipeHeight: 50,

    // distance range from next pipe, in pixels
    pipeDistance: [220, 280],

    // hole range between pipes, in pixels
    pipeHole: [100, 130],

    // local storage object name
    localStorageName: 'bestFlappyScore'
}
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor:0x87ceeb,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 320,
            height: 480
        },
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
        scene: playGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
class playGame extends Phaser.Scene{
    constructor(){
        super('PlayGame');
    }
    preload(){
        this.load.image('character', './assets/smol.gif');
        // this.load.image('character', './assets/test.png');
        this.load.image('tiles', './assets/pipe.png');
        // this.load.image('character', 'https://dummyimage.com/30x30/000/fff');
        // this.load.image('pipe', 'https://dummyimage.com/600x400/000/fff');
    }
    create(){
        this.character = this.physics.add.sprite(80, game.config.height / 2, 'character');
        this.character.body.gravity.y = gameOptions.characterGravity;


        this.floor = this.physics.add.sprite(100, 600, 'tiles');
        

        
	// this.floor.body.collideWorldBounds = true;
	this.floor.body.checkCollision.up = false;
    // this.floor.body.checkCollision.down = false;
    

	// this.character.body.collideWorldBounds = true;
	// this.character.body.checkCollision.up = false;
	// this.character.body.checkCollision.down = false;
    }
    update(){
        console.log('updetzzzz');
    }
    die(){
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start('PlayGame');
    }
}
