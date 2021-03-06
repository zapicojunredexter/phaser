var game;
var gameOptions = {

    // bird gravity, will make bird fall if you don't flap
    birdGravity: 800,

    // horizontal bird speed
    birdSpeed: 125,

    // flap thrust
    birdFlapPower: 300,

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
        this.load.image('bird', './assets/smol.gif');
        // this.load.image('bird', './assets/test.png');
        this.load.image('pipe', './assets/pipe.png');
        // this.load.image('bird', 'https://dummyimage.com/30x30/000/fff');
        // this.load.image('pipe', 'https://dummyimage.com/600x400/000/fff');
    }
    create(){
        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.placePipes(false);
        }
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
        this.bird = this.physics.add.sprite(80, game.config.height / 2, 'bird');
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);
        // this.cursors = this.input.keyboard.addKeys({up:KeyCodes.W,down:KeyCodes.S,left:KeyCodes.A,right:KeyCodes.S});﻿
        // this.input.keyboard.addKeys('w,S,A,D');
        // console.log('zezz', Phaser.Keyboard);
        // this.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
        // this.input.on('up', () => {console.log('called w')}, this);
        this.input.keyboard.on('keydown_W', function (event) {
            console.log('ang w', this, 'asd, eve',event);
            this.flap();
            // W key down
       }, this);
       this.input.keyboard.on('keydown_S', function (event) {
            console.log('ang s');
            this.flap();
        }, this);
        this.input.keyboard.on('keydown_A', function (event) {
             console.log('ang a');
             this.flap();
         }, this);
         this.input.keyboard.on('keydown_D', function (event) {
              console.log('ang d');
              this.flap();
          }, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
    }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
    }
    placePipes(addScore){
        let rightmost = this.getRightmostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, game.config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool = [];
        if(addScore){
            this.updateScore(1);
        }
    }
    flap(){
        this.bird.body.velocity.y = -gameOptions.birdFlapPower;
    }
    getRightmostPipe(){
        let rightmostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightmostPipe = Math.max(rightmostPipe, pipe.x);
        });
        return rightmostPipe;
    }
    update(){
        console.log('updetzzzz');
        // /*
        this.physics.world.collide(this.bird, this.pipeGroup, function(){
            this.die();
        }, null, this);
        if(this.bird.y > game.config.height || this.bird.y < 0){
            this.die();
        }
        this.pipeGroup.getChildren().forEach(function(pipe){
            if(pipe.getBounds().right < 0){
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2){
                    this.placePipes(true);
                }
            }
        }, this);
        // */
    }
    die(){
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start('PlayGame');
    }
}
