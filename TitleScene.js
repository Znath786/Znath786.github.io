class TitleScene extends Phaser.Scene {

	constructor() {
		super('titleScene');
	}

    // preload images and sounds
	preload(){
        this.load.image('backgroundTitle', 'assets/background5.jpg');
        this.load.image('groundTitle', 'assets/realGround.png');
        this.load.image('title', 'assets/gameTitle.png');
        this.load.image('blurb', 'assets/gameBlurb.png');
        this.load.image('characterTitle', 'assets/character.png');
        this.load.image('monsterTitle', 'assets/monsterNew.png');
        this.load.image('berryTitle', 'assets/strawberry.png');  
        this.load.audio('bgm', ['sounds/endingTone.mp3', 'sounds/endingTone.ogg']);
  
    };
    
    create(){
        // background
        this.add.image(400, 300, 'backgroundTitle');

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'groundTitle');
        
        // title screen description and images
        this.add.image(400, 100, 'title');
        this.add.image(400, 325, 'blurb');
        this.add.image(100, 535, 'characterTitle');
        this.add.image(700, 520, 'monsterTitle');
        this.add.image(630, 540, 'berryTitle');

        // annoying arcade game music playing before and after game
        this.bgm = game.sound.add("bgm");
        this.bgm.play();
        this.bgm.volume = 0.3;
        this.bgm.loop = true;
    
        // Interactive BEGIN text
        this.text = this.add.text(280, 500, 'Click Here to Begin', { fontSize: '20px', fill: '#000' });
        this.text.setInteractive({ useHandCursor: true });
        this.text.on('pointerdown', () => this.beginGame());
    };

    // update function to try to prevent bug
    update(){
        this.hello = "hi";
    }

    // stops the scene and the bgm, begins game
    beginGame() {
        this.scene.stop();
        this.bgm.stop();
        this.scene.start('gameScene');
    };
}

