const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 300,
  parent: "game-container",
  backgroundColor: "#ffffff", // Set background color to white
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 }, // Adjust gravity for the new height
      debug: false, // Disable debug mode
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let score = 0;
let level = 1;
let gameSpeed = 5;
let jumpVelocity = -300;
let gravity = 600;
let gameOver = false;
let gameStarted = false;

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  gameStarted = true;
  game.scene.resume("default");
});

function preload() {
  this.load.image("ground", "assets/ground.png");
  this.load.image("dino", "assets/dino.png");
  this.load.image("cactus", "assets/cactus.png");
  this.load.image("cloud", "assets/cloud.png"); // Load cloud image
}

function create() {
  this.ground = this.physics.add.staticGroup();

  // Create multiple ground sprites to cover the width of the game container
  for (let x = 0; x < config.width; x += 45) {
    this.ground.create(x, 284, "ground").setScale(1).refreshBody();
  }

  this.dino = this.physics.add.sprite(100, 244, "dino").setScale(1);
  this.dino.setBounce(0.2);
  this.dino.setCollideWorldBounds(true);

  this.cursors = this.input.keyboard.createCursorKeys();
  this.spaceBar = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  this.obstacles = this.physics.add.group();
  this.clouds = this.add.group(); // Add clouds group as static objects

  this.physics.add.collider(this.dino, this.ground);
  this.physics.add.collider(this.dino, this.obstacles, hitObstacle, null, this);

  this.time.addEvent({
    delay: 2000,
    callback: addObstacle,
    callbackScope: this,
    loop: true,
  });

  this.time.addEvent({
    delay: 3000,
    callback: addCloud,
    callbackScope: this,
    loop: true,
  });

  // Add text for score and level
  this.scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "16px", // Set font size
    fill: "#000",
    fontFamily: '"Press Start 2P", cursive', // Apply the font
  });
  this.levelText = this.add.text(16, 50, "Level: 1", {
    fontSize: "16px", // Set font size
    fill: "#000",
    fontFamily: '"Press Start 2P", cursive', // Apply the font
  });

  // Add timed event to update level every 15 seconds
  this.time.addEvent({
    delay: 15000,
    callback: updateLevel,
    callbackScope: this,
    loop: true,
  });

  // Hide the game container and show the start button
  document.getElementById("game-container").style.display = "none";
  document.getElementById("start-button").style.display = "block";
  document.getElementById("dino-image").style.display = "block";

  // Add event listener to the start button
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("dino-image").style.display = "no";
    document.getElementById("game-container").style.display = "block";
    this.scene.resume();
  });

  // Add Game Over text and Restart button
  this.gameOverText = this.add
    .text(config.width / 2, config.height / 2, "Game Over", {
      fontSize: "32px",
      fill: "#000",
      fontFamily: '"Press Start 2P", cursive',
    })
    .setOrigin(0.5);
  this.gameOverText.setVisible(false);

  this.restartButton = this.add
    .text(config.width / 2, config.height / 2 + 50, "Restart", {
      fontSize: "16px",
      fill: "#000",
      fontFamily: '"Press Start 2P", cursive',
    })
    .setOrigin(0.5)
    .setInteractive();
  this.restartButton.setVisible(false);

  this.restartButton.on("pointerdown", () => {
    this.scene.restart();
    score = 0;
    level = 1;
    gameSpeed = 5;
    jumpVelocity = -300;
    gravity = 600;
    gameOver = false;
    document.getElementById("game-over").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    gameStarted = true;
    this.scene.resume();
  });
}

function update() {
  if (gameOver) return;

  if (this.cursors.up.isDown || this.spaceBar.isDown) {
    console.log("Jump key pressed");
  }

  if (
    (this.cursors.up.isDown || this.spaceBar.isDown) &&
    this.dino.body.touching.down
  ) {
    this.dino.setVelocityY(jumpVelocity); // Use dynamic jump velocity
  }

  this.obstacles.children.iterate(function (obstacle) {
    if (obstacle.x < -obstacle.width) {
      obstacle.destroy();
    }
  });

  this.ground.children.iterate(function (ground) {
    ground.x -= gameSpeed;
    if (ground.x < -ground.width) {
      ground.x += ground.width * this.ground.getChildren().length;
    }
  }, this);

  this.obstacles.children.iterate(function (obstacle) {
    obstacle.x -= gameSpeed;
    if (obstacle.x < -obstacle.width) {
      obstacle.destroy();
    }
  });

  this.clouds.children.iterate(function (cloud) {
    if (cloud) {
      cloud.x -= 2; // Move clouds slower than ground and obstacles
      if (cloud.x < -cloud.width) {
        cloud.destroy();
      }
    }
  });

  // Increase score based on time survived
  score += 1;

  // Update score and level text
  this.scoreText.setText("Score: " + score);
  this.levelText.setText("Level: " + level);
}

function addObstacle() {
  const obstacle = this.obstacles.create(600, 244, "cactus").setScale(1);
  obstacle.setVelocityX(-gameSpeed * 40); // Use dynamic game speed
  obstacle.setCollideWorldBounds(true);
  obstacle.setImmovable(true);
}

function addCloud() {
  const cloudY = Phaser.Math.Between(150, 250); // Random Y position between 150 and 250
  const cloud = this.clouds.create(600, cloudY, "cloud").setScale(1);
}

function hitObstacle(dino, obstacle) {
  this.physics.pause();
  dino.setTint(0xff0000);
  gameOver = true;
  this.gameOverText.setVisible(true);
  this.restartButton.setVisible(true);
}

function updateLevel() {
  level += 1; // Increase level
  gameSpeed += 1; // Increase game speed
  gravity += 50; // Increase gravity to make the jump quicker
  this.physics.world.gravity.y = gravity; // Apply new gravity
}
