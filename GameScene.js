class GameScene extends Phaser.Scene {

	constructor() {
		super('gameScene');
	}

    init() {
        // declares and/ or initializes global variables
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.lives=3;
        this.score=0;
        this.colliderActivated = true;
        this.platforms, this.mainChar, this.monster, this.groundLayer;
        this.jumpSound, this.bumpSound, this.collectSound, this.overSound;
        this.introSound;

    };

    preload() {
        // load resources 
        this.load.image('background', 'assets2/background5.jpg');
        this.load.image('platform', 'assets2/groundPieces.png');
        this.load.image('platformSmall', 'assets2/groundSmallPiece.png');
        this.load.image('character', 'assets2/character.png');
        this.load.image('monster', 'assets2/monsterNew.png');
        this.load.image('berry', 'assets2/strawberry.png');
        this.load.image('ground', 'assets2/realGround.png');
        this.load.image('newGame', 'assets2/bigNewGame2.png');

        this.load.audio('jump', ['sounds/jumpSound.mp3', 'sounds/jumpSound.ogg']);
        this.load.audio('collect', ['sounds/collectSound.mp3', 'sounds/collectSound.ogg']);
        //this.load.audio('intro', ['sounds/introSound.mp3', 'sounds/introSound.ogg']);
        this.load.audio('over', ['sounds/lowPitchOver.mp3', 'sounds/lowPitchOver.ogg']);
        this.load.audio('bump', ['sounds/bumpSound.mp3', 'sounds/bumpSound.ogg']);
    };

    create() {
        // background
        this.add.image(400, 300, 'background');

        //main Character
        this.mainChar = this.physics.add.sprite(400, 300, 'character');
        this.mainChar.setBounce(0.2);  
        this.mainChar.setCollideWorldBounds(true); 

        // monster
        this.monster = this.physics.add.sprite(200, 50, 'monster');
        this.monster.setBounce(1);
        this.monster.setVelocity(Phaser.Math.Between(-250, 250), 40);
        this.monster.allowGravity = false;
        this.monster.setCollideWorldBounds(true);

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

        //berries
        this.berrys = this.physics.add.group({
            key: 'berry',
            repeat: 0,
            setXY: { x: Phaser.Math.Between(10, 790), y: Phaser.Math.Between(0, 500), stepX: 70 }
        });
        this.berrys.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //Screen text
        this.livesText = this.add.text(16, 16, 'Lives: 3', { fontSize: '32px', fill: '#000' });
        this.scoreText = this.add.text(16, 40, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.livesText = this.add.text(16, 570, 'H: Help     N: New Game', { fontSize: '20px', fill: '#fff' });


        // add sounds
        this.jumpSound = game.sound.add('jump');
        //this.introSound = game.sound.add('intro');
        this.overSound = game.sound.add('over');
        this.collectSound = game.sound.add('collect');
        this.bumpSound = game.sound.add("bump");
        
        //keys
        // this.cursors.up.isDown = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown_H', this.help, this);
        this.input.keyboard.on('keydown_N', this.getQuitMenu, this);
        // use to check for bug to make sure key is actually being pressed
        // previously sometimes mainChar would move on its own
        this.input.keyboard.on('keydown_LEFT', ()=>{this.leftPressed=true; } );
        this.input.keyboard.on('keydown_RIGHT', ()=>{this.rightPressed=true;} );
        this.input.keyboard.on('keydown_UP', ()=>{this.upPressed=true; } );
    };

    update() {
        // prevent collisions between game objects
        this.physics.add.collider(this.platforms, this.monster);
        this.physics.add.collider(this.mainChar, this.platforms);
        this.physics.add.collider(this.platforms, this.berrys);
        // calls function to "collect" the berries when overlaps with them
        this.physics.add.overlap(this.berrys, this.mainChar, this.collectBerry, null, this);
        // two types of collision logic between mainChar and monster because first type unreliable
        this.physics.add.collider(this.mainChar, this.monster, this.hitMonster, ()=>{
                return this.colliderActivated;
            }, this);
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.mainChar.getBounds(), this.monster.getBounds())) {
            this.hitMonster(this.mainChar, this.monster);
        }
     
        // allow for movement
        if (this.cursors.left.isDown && this.leftPressed){
        this.mainChar.setVelocityX(-160);
        } else if (this.cursors.right.isDown && this.rightPressed){
            this.mainChar.setVelocityX(160);
        } else{
            this.mainChar.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.mainChar.body.onFloor() && this.upPressed){
            this.mainChar.setVelocityY(-330);
            this.jumpSound.play(); // play sound when jumping
            this.jumpSound.volume = 0.5;
        }
    };
    
    // called when mainChar collides with monster
    hitMonster(){
        // flagger variable making sure the function called only once at a time
        this.colliderActivated = false; 
        //console.log('floor hit');
        if(this.lives==1){
            this.overSound.play();
            this.lives=0;
            // end game 
            this.scene.stop();
            this.scene.start("endScene", {score: this.score});
        }else if(this.lives>1){
            // play sound and randomly place monster on other side of the game
            this.bumpSound.play();
            this.bumpSound.volume = 0.5;
            var x = (this.mainChar.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            this.monster.setPosition(x, 50);
            this.lives--;
        }
        //console.log("changing lives");
        this.livesText.setText('Lives: ' + this.lives);
    };

    // make new berry appear and increase score by 10
    collectBerry(){
        this.berrys.children.iterate(function (child) {
            child.enableBody(true, Phaser.Math.Between(10, 790), Phaser.Math.Between(0, 500), true, true);
        });
        this.collectSound.play();
        this.score +=10;
        this.scoreText.setText('Score: ' + this.score);
    };

    // pause the game and change scene to show help menu
    help(){
        this.scene.pause();
        this.scene.launch("helpScene", {score: this.score, lives: this.lives});
    };

    // pause the game and change scene to show quit menu
    getQuitMenu(){
        this.scene.pause();
        this.scene.launch("quitScene", {score: this.score, lives: this.lives});
    }
}

