var gameScene = new GameScene();
var titleScene= new TitleScene();
var helpScene= new HelpScene();
var endScene = new EndScene();
var quitScene = new QuitScene();


var config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
            debug: false,
        }
    },
};

// Create the game with our config values
var game = new Phaser.Game(config);

// Add all the scenes
game.scene.add("titleScene", titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add("helpScene", helpScene);
game.scene.add("endScene", endScene);
game.scene.add("quitScene", quitScene);

//Start title Scene
game.scene.start('titleScene');




