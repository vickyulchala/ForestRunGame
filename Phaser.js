// game.js
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
    // Load assets for the player, pig, and obstacles
    this.load.image('forest-bg', 'forest-bg.png');
    this.load.image('player', 'stick-figure.png');
    this.load.image('pig', 'forest-pig.png');
    this.load.image('rock', 'rock.png');
    this.load.image('log', 'log.png');
    this.load.image('powerup', 'powerup.png');
}

function create() {
    // Create background and player character
    this.add.image(400, 300, 'forest-bg');
    this.player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    this.pig = this.physics.add.sprite(50, 450, 'pig').setScale(0.6);

    // Player physics properties
    this.player.setCollideWorldBounds(true);

    // Obstacle group with physical properties
    this.obstacles = this.physics.add.group();
    this.time.addEvent({
        delay: 1500,
        callback: addObstacle,
        callbackScope: this,
        loop: true
    });

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Collision detection
    this.physics.add.collider(this.player, this.obstacles, hitObstacle, null, this);
}

function update() {
    // Player control logic
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(200);
    }

    // Update pig speed to chase player as they advance
    this.pig.x += 1.5;
}

function addObstacle() {
    // Randomly place obstacles at intervals
    const obstacle = this.obstacles.create(800, 550, Phaser.Math.RND.pick(['rock', 'log']));
    obstacle.setVelocityX(-200);
    obstacle.setCollideWorldBounds(true);
    obstacle.body.immovable = true;
}

function hitObstacle(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
}
