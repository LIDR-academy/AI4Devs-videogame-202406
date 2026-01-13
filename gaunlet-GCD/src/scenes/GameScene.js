class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.INITIAL_TIME = 60;
        this.INITIAL_HEALTH = 100;
        this.timeLeft = this.INITIAL_TIME;
        this.health = this.INITIAL_HEALTH;
        this.enemyMoveEvent = null;
        this.backgroundMusic = null;
        this.MUSIC_VOLUME = 0.5; // Volumen de la música de fondo
        this.SFX_VOLUME = 1; // Volumen de los efectos de sonido
        this.victorySound = null;
        this.startDelay = 2000; // 2 segundos de retraso antes de iniciar el movimiento
    }

    create(data) {
        // Inicializar valores
        this.timeLeft = this.INITIAL_TIME;
        this.health = this.INITIAL_HEALTH;
        // Usar la puntuación pasada o inicializar a 0 si no hay
        const initialScore = data.score || 0;
        this.registry.set('score', initialScore);
        this.registry.set('health', this.health);
        this.registry.set('leftTime', this.timeLeft);

        // Iniciar la música de fondo inmediatamente con volumen reducido
        this.backgroundMusic = this.sound.add('background', { loop: true, volume: this.MUSIC_VOLUME });
        this.backgroundMusic.play();

        // Crear borde visible
        const { width, height } = this.scale;
        const borderWidth = 2;
        const borderColor = 0xffffff;
        const gameZone = this.add.rectangle(width / 2, height / 2 + 30, width - 20, height - 80, 0x000000);
        gameZone.setStrokeStyle(borderWidth, borderColor);

        // Ajustar la física del mundo al nuevo tamaño de la zona de juego
        this.physics.world.setBounds(
            gameZone.x - gameZone.width / 2 + borderWidth,
            gameZone.y - gameZone.height / 2 + borderWidth,
            gameZone.width - borderWidth * 2,
            gameZone.height - borderWidth * 2
        );

        // Create the player
        this.archer = new Archer(this, width / 2, height / 2 + 30);
        this.archer.setScale(0.3); // Escala el tamaño del arquero al 50%
        this.archer.setCollideWorldBounds(true); // Agregado para respetar los límites del mundo

        // Create enemies group
        this.enemies = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let enemyPosition = this.getValidEnemyPosition(gameZone);
            let enemy = new Enemy(this, enemyPosition.x, enemyPosition.y);
            enemy.setScale(0.3); // Escala el tamaño de los enemigos al 50%
            this.enemies.add(enemy);
        }

        // Reemplazar el código de inicio de movimiento de enemigos con esto:
        this.time.delayedCall(this.startDelay, () => {
            this.startMovement();
        }, [], this);

        // Create key and door
        this.key = new Key(
            this,
            Phaser.Math.Between(gameZone.x - gameZone.width / 2 + 20, gameZone.x + gameZone.width / 2 - 20),
            Phaser.Math.Between(gameZone.y - gameZone.height / 2 + 20, gameZone.y + gameZone.height / 2 - 20)
        );
        this.key.setScale(0.1); // Escala el tamaño de la llave al 50%
        this.door = new Door(
            this,
            Phaser.Math.Between(gameZone.x - gameZone.width / 2 + 20, gameZone.x + gameZone.width / 2 - 20),
            Phaser.Math.Between(gameZone.y - gameZone.height / 2 + 20, gameZone.y + gameZone.height / 2 - 20)
        );
        this.door.setScale(0.3); // Escala el tamaño de la puerta al 50%

        // Collisions
        this.physics.add.overlap(this.archer.arrows, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.archer, this.enemies, this.hitPlayer, null, this);
        this.physics.add.overlap(this.archer, this.key, this.collectKey, null, this);
        this.physics.add.overlap(this.archer, this.door, this.reachDoor, null, this);
        
        // UI
        this.scene.launch('UIScene');
        this.scene.bringToTop('UIScene');

        // Listen for enemy killed event
        this.events.on('enemyKilled', this.updateScore, this);

        // Crear el temporizador
        this.time.addEvent({
            delay: 1000, // 1000 ms = 1 segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Crear sonidos para efectos
        this.hitSound = this.sound.add('hit', { volume: this.SFX_VOLUME });
        this.explosionSound = this.sound.add('explosion', { volume: this.SFX_VOLUME });
        this.shootSound = this.sound.add('shoot', { volume: this.SFX_VOLUME });
        this.keyPickedSound = this.sound.add('key_picked', { volume: this.SFX_VOLUME });
        this.victorySound = this.sound.add('victory', { volume: this.SFX_VOLUME });
    }

    getValidEnemyPosition(gameZone) {
        let x, y;
        do {
            x = Phaser.Math.Between(gameZone.x - gameZone.width / 2 + 20, gameZone.x + gameZone.width / 2 - 20);
            y = Phaser.Math.Between(gameZone.y - gameZone.height / 2 + 20, gameZone.y + gameZone.height / 2 - 20);
        } while (Phaser.Math.Distance.Between(x, y, this.archer.x, this.archer.y) < 100);
        return { x, y };
    }

    startMovement() {
        // Iniciar movimiento de enemigos
        this.enemyMoveEvent = this.time.addEvent({
            delay: 2000,
            callback: this.moveAllEnemies,
            callbackScope: this,
            loop: true
        });
        this.moveAllEnemies(); // Mover enemigos inmediatamente

        // Permitir que el arquero se mueva
        this.archer.canMove = true;
    }

    moveAllEnemies() {
        this.enemies.children.entries.forEach(enemy => {
            enemy.setRandomVelocity();
        });
    }

    hitEnemy(arrow, enemy) {
        arrow.destroy();
        enemy.takeDamage(10);
        this.hitSound.play();
    }

    hitPlayer(player, enemy) {
        enemy.explode();
        player.takeDamage(20);
        this.explosionSound.play();
        this.registry.set('health', player.health);

        if (player.health <= 0) {
            this.endGame();
        }
    }

    collectKey(player, key) {
        key.collect();
        player.hasKey = true;
        this.keyPickedSound.play(); // Reproduce el sonido cuando se recoge la llave
    }

    reachDoor(player, door) {
        if (player.hasKey) {
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
            }
            this.victorySound.play();
            this.physics.pause();
            this.time.delayedCall(this.victorySound.duration * 1000, () => {
                if (this.backgroundMusic) {
                    this.backgroundMusic.stop();
                }
                this.scene.start('NextLevelScene');
            });
        }
    }

    update(time) {
        this.archer.update(time);
        this.archer.arrows.children.each(function(arrow) {
            arrow.update();
        }, this);

        // Actualizar enemigos
        this.enemies.children.entries.forEach(enemy => {
            enemy.update();
        });
    }

    updateScore(points) {
        let currentScore = this.registry.get('score') || 0;
        this.registry.set('score', currentScore + points);
    }

    updateTimer() {
        this.timeLeft--;
        this.registry.set('leftTime', this.timeLeft);

        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        // Detener todos los eventos y sonidos
        if (this.enemyMoveEvent) {
            this.enemyMoveEvent.remove();
        }
        this.sound.stopAll(); // Detiene todos los sonidos, incluida la música de fondo

        // Pausar la física del juego
        this.physics.pause();

        // Iniciar la escena de Game Over
        this.scene.start('GameOverScene');
    }
}