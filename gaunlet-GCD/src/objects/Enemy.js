class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = 50;
        this.speed = 50;
    }

    setRandomVelocity() {
        const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;
        this.setVelocity(vx, vy);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.scene.events.emit('enemyKilled', 50);
            this.explode();
        }
    }

    explode() {
        this.scene.sound.play('explosion');
        this.destroy();
    }

    update() {
        // Mantener al enemigo dentro de los límites del mundo
        this.scene.physics.world.wrap(this, 5);
    }
}