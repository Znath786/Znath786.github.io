class EndScene extends Phaser.Scene {

	constructor() {
		super('endScene');
    }
    
    // receive data regarding the current score
    init(data){
        this.score = data.score;
    }

    // load images and sounds
	preload(){
        this.load.image('backgroundEnd', 'assets2/background5.jpg');
        this.load.image('groundEnd', 'assets2/realGround.png');
        this.load.image('over', 'assets2/gameOver.png');
        this.load.image('endNew', 'assets2/endNewGame.png'); 
        this.load.image('platformEnd', 'assets2/groundPieces.png');
        this.load.image('platformSmallEnd', 'assets2/groundSmallPiece.png');
        this.load.image('monsterEnd', 'assets2/monsterNew.png');
        this.load.audio('bgmEnd', ['sounds/endingTone.mp3', 'sounds/endingTone.ogg']);

    };
    
    create(){
        // background
        this.add.image(400, 300, 'backgroundEnd');

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'ground');
        this.platforms.create(25, 475, 'platform');
        this.platforms.create(170, 367, 'platform');
        this.platforms.create(450, 400, 'platform');
        this.platforms.create(550, 100, 'platform');
        this.platforms.create(700, 500, 'platformSmall');
        this.platforms.create(650, 300, 'platformSmall');
        this.platforms.create(300, 150, 'platform');
        this.platforms.create(795, 200, 'platform');

        //monster
        this.monster = this.physics.add.sprite(200, 50, 'monster');
        this.monster.setBounce(1);
        this.monster.setVelocity(Phaser.Math.Between(-250, 250), 40);
        this.monster.allowGravity = false;
        this.monster.setCollideWorldBounds(true);

        // game over text
        this.gameOver = this.add.image(400, 250, 'over');
        // new game? text
        this.endNewGame = this.add.image(400, 500, 'endNew');

        // calls function to restart new game
        this.input.keyboard.on('keydown_N', this.swap, this);

        // plays annoying arcade music for end scene (and title scene)
        this.bgm = game.sound.add("bgmEnd");
        this.bgm.play();
        this.bgm.volume = 0.3;
        this.bgm.loop = true;

        // display 0 lives and final score
        this.livesText = this.add.text(16, 16, 'Lives: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText = this.add.text(16, 40, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });  
         
    };

    // prevent collisions between monster and platforms
    update(){
        this.physics.add.collider(this.platforms, this.monster);
    }

    // stop other scenes and switch to title scene to restart game
    swap(){
        this.bgm.stop();
        this.scene.stop();
        this.scene.stop("gameScene");
        this.scene.start("titleScene");
    }
}


