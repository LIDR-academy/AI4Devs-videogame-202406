class Archer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'archer');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.arrows = scene.physics.add.group();
        this.health = 100;
        this.hasKey = false;
        this.direction = 'right'; // Default direction
        this.lastShotTime = 0; // Tiempo del último disparo
        this.shotCooldown = 200; // Intervalo de tiempo entre disparos en milisegundos
        this.canMove = false; // Nueva propiedad para controlar si el arquero puede moverse
    }

    update(time) {
        if (!this.canMove) {
            this.setVelocity(0);
            return;
        }

        this.setVelocity(0);

        if (this.cursors.left.isDown) {            
            this.setVelocityX(-160);
            this.direction = 'left';
            this.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.direction = 'right';
            this.setFlipX(false);
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-160);
            this.direction = 'up';
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(160);
            this.direction = 'down';
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && time > this.lastShotTime + this.shotCooldown) {
            this.shootArrow();
            this.lastShotTime = time;
        }
    }

    shootArrow() {
        let arrow = new Arrow(this.scene, this.x, this.y, this.direction);
        arrow.setScale(0.2);
        this.arrows.add(arrow);
        arrow.setStartVelocity();
        this.scene.shootSound.play();
    }

    takeDamage(amount) {
        this.health -= amount;
        this.scene.registry.set('health', this.health);
        if (this.health <= 0) {
            this.scene.scene.start('GameOverScene');
        }
    }
}