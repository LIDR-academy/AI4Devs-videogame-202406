class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.image("tiles", "assets/images/tiles.png");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/map.json");
        this.load.image("car", "assets/images/car.png");
    }

    create() {
        this.scene.start("MainMenuScene");
    }
}

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenuScene");
    }

    create() {
        const startButton = this.add
            .text(400, 300, "Iniciar Juego", { fill: "#0f0" })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => this.scene.start("GameScene"));
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        // Los assets ya se cargaron en PreloadScene
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles");

        // Renderizar la capa Ground primero
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const wallsLayer = map.createLayer("Walls", tileset, 0, 0);

        // Verificar si wallsLayer se ha creado correctamente
        if (!wallsLayer) {
            console.error("No se pudo encontrar la capa 'Walls' en el mapa.");
            return;
        }

        // Configurar colisiones para la capa de paredes
        wallsLayer.setCollisionByProperty({ collides: true });

        // Configurar los límites del mundo
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Encontrar una posición inicial válida para el jugador
        const playerStartPosition = this.findPlayerStartPosition(groundLayer);

        // Añadir el coche del jugador y escalarlo
        this.player = this.physics.add.sprite(playerStartPosition.x, playerStartPosition.y, "car");
        this.player.setScale(0.05);
        this.player.setCollideWorldBounds(true);

        // Ajustar el origen del sprite para que rote correctamente
        this.player.setOrigin(0.5, 0.5);

        // Ajustar el hitbox del coche para que sea más pequeño que el sprite
        this.player.body.setSize(16, 8);
        this.player.body.setOffset(8, 4);

        // Rotar el coche para que apunte hacia la derecha
        this.player.setAngle(0);

        // Configurar colisiones entre el jugador y las paredes
        this.physics.add.collider(this.player, wallsLayer);

        // Configurar controles
        this.cursors = this.input.keyboard.createCursorKeys();

        // Configurar la cámara para seguir al jugador
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(2);

        // Añadir restricción de movimiento al suelo
        this.groundTiles = groundLayer.filterTiles((tile) => tile.index === 3);
    }

    update() {
        const speed = 200;
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown) {
            this.player.setAngle(-90); // Apuntar hacia la izquierda
            velocityX = -speed;
        } else if (this.cursors.right.isDown) {
            this.player.setAngle(90); // Apuntar hacia la derecha
            velocityX = speed;
        }

        if (this.cursors.up.isDown) {
            this.player.setAngle(0); // Apuntar hacia arriba
            velocityY = -speed;
        } else if (this.cursors.down.isDown) {
            this.player.setAngle(180); // Apuntar hacia abajo
            velocityY = speed;
        }

        // Normalizar la velocidad en diagonales
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2;
            velocityY *= Math.SQRT1_2;
        }

        // Verificar si el jugador está sobre un tile de suelo antes de moverse
        const newX = this.player.x + (velocityX * this.game.loop.delta) / 1000;
        const newY = this.player.y + (velocityY * this.game.loop.delta) / 1000;

        if (this.isOnGround(newX, newY)) {
            this.player.setVelocity(velocityX, velocityY);
        } else {
            this.player.setVelocity(0, 0);
        }
    }

    findPlayerStartPosition(groundLayer) {
        const groundTiles = groundLayer.filterTiles((tile) => tile.index === 3);
        if (groundTiles.length === 0) {
            console.warn("No se encontraron tiles de suelo. Usando una posición predeterminada.");
            return { x: 100, y: 100 };
        }
        const randomTile = Phaser.Utils.Array.GetRandom(groundTiles);
        return {
            x: randomTile.pixelX + randomTile.width / 2,
            y: randomTile.pixelY + randomTile.height / 2,
        };
    }

    isOnGround(x, y) {
        if (this.groundTiles.length === 0) return true; // Permitir movimiento si no hay tiles de suelo
        const tile = this.groundTiles.find(
            (t) => x >= t.pixelX && x < t.pixelX + t.width && y >= t.pixelY && y < t.pixelY + t.height
        );
        return tile !== undefined;
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        this.add.text(400, 200, "Game Over", { fill: "#fff" }).setOrigin(0.5);
        const restartButton = this.add
            .text(400, 300, "Reiniciar", { fill: "#0f0" })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => this.scene.start("GameScene"));
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    scene: [PreloadScene, MainMenuScene, GameScene, GameOverScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
