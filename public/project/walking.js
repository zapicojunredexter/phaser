var game;
const move_space = 2;
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor:0x87ceeb,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 500,
            height: 500
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
        console.log('preload');
        this.load.image('gerald', './assets/gerald.png');
        
        this.load.image('bomb', './assets/lobster.jpg');
    }

    addLobster() {
        // this.bombs = this.physics.add.sprite(game.config.width / 3, game.config.height / 2, 'bomb');
        this.bombs.push(this.physics.add.sprite(game.config.width / 3, game.config.height / 2, 'bomb'));
    }
    create(){
        console.log('create');
        this.gerald = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'gerald');
        this.bombs = [];
        this.counter = 0;
        
        // this.gerald = this.physics.add.sprite(game.world.centerX, game.world.centerY, 'bot');
        // this.gerald.anchor.setTo(0.5, 0.5);
        // this.gerald.scale.setTo(2, 2);
    
        // this.gerald.animations.add('run');
        // this.gerald.animations.play('run', 10, true);
        

	    // this.gerald.sprite.;
        this.input.keyboard.on('keydown_W', function (event) {
            // console.log('pressed w');
            this.gerald.y -= move_space;
            // W key down
        }, this);
        this.input.keyboard.on('keydown_S', function (event) {
            // console.log('ang s');
            this.gerald.y += move_space;
        }, this);
        this.input.keyboard.on('keydown_A', function (event) {
            //  console.log('ang a');
             this.gerald.x -= move_space;
         }, this);
        this.input.keyboard.on('keydown_D', function (event) {
            //   console.log('ang d');
              this.gerald.x += move_space;
        }, this);

        this.prevCounter = -1;
        this.counter = 0;
        if(this.startLobster) {
            this.startLobster();
        }else{
            // this.addLobster();
            this.startLobster = setInterval(() => {
                if(this.counter % 10 === 0) {

                    this.addLobster();
                }
                this.counter+=1;
            }, 100)
        }
    }
    update(time,test){
        // console.log('updet', event);
        
        this.physics.world.collide(this.gerald, this.bombs, function(){
            this.die();
        }, null, this);
        // console.log('zecounter', this.counter);

        if(this.prevCounter<this.counter) {
            this.prevCounter+=1;
            this.bombs.forEach((lobster) => {
                // console.log('eehh',lobster);
                this.moveLobster(lobster);
            })
        }
        if(this.counter%5 === 0) {
            
        // this.addLobster();
        }

    }

    moveLobster(lobster) {
        const num = Math.floor(Math.random() * 4); 
        console.log('ayuuu', lobster.upN,lobster.downN, lobster.leftN, lobster.rightN);
        switch(num){
            // right
            case 0:
                console.log('rightt');
                lobster.x += move_space * 2;
                if(lobster.rightN){
                    lobster.rightN+=1;
                }else{
                    lobster.rightN = 1;
                }
                break;
            // left
            case 1:
                console.log('leftt');
                lobster.x -= move_space * 2;
                if(lobster.leftN){
                    lobster.leftN+=1;
                }else{
                    lobster.leftN = 1;
                }
                break;
            // down
            case 2:
                console.log('downn');
                lobster.y += move_space * 2;
                if(lobster.downN){
                    lobster.downN+=1;
                }else{
                    lobster.downN = 1;
                }
                break;
            // up
            case 3:
                console.log('upp');
                lobster.y -= move_space * 2;
                if(lobster.upN){
                    lobster.upN+=1;
                }else{
                    lobster.upN = 1;
                }
                break;
            default:

        }
        // var num = Math.floor(Math.random()*(move_space*3)) + 1; // this will get a number between 1 and 1;
        // num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
        // const randomX = num;
        // const randomY = num;


        // const shouldBeNewX = lobster.x + randomX;
        // const shouldBeNewY = lobster.y + randomY;
        // if(shouldBeNewX < game.config.width && shouldBeNewX > 0){

        //     lobster.x+=randomX;
        // }
        // if(shouldBeNewY < game.config.width && shouldBeNewY > 0) {

        //     lobster.y+=randomY;
        // }
    }
    
    die(){
        alert('ouch');
            
        this.scene.start('PlayGame');
    }
}
