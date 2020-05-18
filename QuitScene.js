class QuitScene extends Phaser.Scene {

	constructor() {
		super('quitScene');
    }

    init(data){
        this.score = data.score;
        this.lives = data.lives;
        this.toQuit = false;
        this.toCont = false;

    }

	preload(){
        this.load.image('backgroundQuit', 'assets/background5.jpg');
        this.load.image('groundQuit', 'assets/realGround.png');
        this.load.image('platformQuit', 'assets/groundPieces.png');
        this.load.image('platformSmallQuit', 'assets/groundSmallPiece.png');
        this.load.image('quitMenu', 'assets/quitMenu.png');
    };
    
    create(){
        // background
        this.add.image(400, 300, 'backgroundQuit');

         //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'groundQuit');
        this.platforms.create(25, 475, 'platformQuit');
        this.platforms.create(170, 367, 'platformQuit');
        this.platforms.create(450, 400, 'platformQuit');
        this.platforms.create(550, 100, 'platformQuit');
        this.platforms.create(700, 500, 'platformSmallQuit');
        this.platforms.create(650, 300, 'platformSmallQuit');
        this.platforms.create(300, 150, 'platformQuit');
        this.platforms.create(795, 200, 'platformQuit');

        // displays the quit menu
        this.add.image(400, 300, 'quitMenu');

        // shows the currect score and lives count
        this.livesText = this.add.text(16, 16, 'Lives: ' + this.lives, { fontSize: '32px', fill: '#000' });
        this.scoreText = this.add.text(16, 40, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

        // makes toQuit false when press Y key
        this.input.keyboard.on('keydown_Y', ()=>{this.toQuit=true;} );

        // calls on function to continue the current game
        this.input.keyboard.on('keydown_N', this.continue, this);

    };
    
    update(){
        // stops this scene and current game and starts title screen to begin new game
        // this is placed as an if statement in update function instead of as a separate function
                // to try to combat a bug
        if(this.toQuit){
            console.log("ready to quit");
            this.scene.stop("gameScene");
            this.scene.stop();
            this.scene.start("titleScene");
        }
    }
    
    // resumes current game
    continue(){
        this.scene.sleep();
        this.scene.resume('gameScene');
    };



}


