class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'arrow');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.direction = direction;
        this.speed = 300; // Velocidad de la flecha
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    setStartVelocity() {
        // Ajusta la rotación de la flecha según la dirección
        switch (this.direction) {
            case 'left':
                this.setAngle(180);
                this.setVelocity(-this.speed, 0);
                break;
            case 'right':
                this.setAngle(0);
                this.setVelocity(this.speed, 0);
                break;
            case 'up':
                this.setAngle(-90);
                this.setVelocity(0, -this.speed);
                break;
            case 'down':
                this.setAngle(90);
                this.setVelocity(0, this.speed);
                break;
        }
    }

    update() {
        // Destruye la flecha si sale de los límites del mundo
        if (this.x < 0 || this.x > this.scene.sys.canvas.width || this.y < 0 || this.y > this.scene.sys.canvas.height) {
            this.destroy();
        }
    }
}
