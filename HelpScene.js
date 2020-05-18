class HelpScene extends Phaser.Scene {

	constructor() {
		super('helpScene');
    }
    
    // recived data of current score and lives
    init(data){
        this.score = data.score;
        this.lives = data.lives;
    }

    // preload images and sounds
	preload(){
        this.load.image('backgroundHelp', 'assets/background5.jpg');
        this.load.image('groundHelp', 'assets/realGround.png');
        this.load.image('platformHelp', 'assets/groundPieces.png');
        this.load.image('platformSmallHelp', 'assets/groundSmallPiece.png');
        this.load.image('helpHelp', 'assets/woodHelpMenu.png');  
    };
    
    create(){
         // background
         this.add.image(400, 300, 'backgroundHelp');

         //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'groundHelp');
        this.platforms.create(25, 475, 'platformHelp');
        this.platforms.create(170, 367, 'platformHelp');
        this.platforms.create(450, 400, 'platformHelp');
        this.platforms.create(550, 100, 'platformHelp');
        this.platforms.create(700, 500, 'platformSmallHelp');
        this.platforms.create(650, 300, 'platformSmallHelp');
        this.platforms.create(300, 150, 'platformHelp');
        this.platforms.create(795, 200, 'platformHelp');

        // displays current score and lives count
        this.livesText = this.add.text(16, 16, 'Lives: ' + this.lives, { fontSize: '32px', fill: '#000' });
        this.scoreText = this.add.text(16, 40, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

        // displays help menu
        this.add.image(400, 300, 'helpHelp');

        // any keypress calls the getBack function
        this.input.keyboard.on('keydown', this.getBack, this);
    };

    // stops this scene and resumes game
    getBack() {
        console.log("getting called back");
        this.scene.stop();
        this.scene.resume('gameScene');
    };
}
