const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('forest-bg', 'assets/forest-bg.png');
    this.load.image('player', 'assets/stick-figure.png');
    this.load.image('pig', 'assets/forest-pig.png');
}

function create() {
    this.add.image(400, 300, 'forest-bg');
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.pig = this.physics.add.sprite(50, 450, 'pig');
    this.player.setCollideWorldBounds(true);
}

function update() {
    // Placeholder for game logic
}
