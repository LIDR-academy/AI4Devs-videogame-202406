class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load assets here
        this.load.image('archer', 'assets/images/archer.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('door', 'assets/images/door.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.image('tileset', 'assets/images/tileset.png');
        this.load.audio('shoot', 'assets/audio/shoot.wav');
        this.load.audio('hit', 'assets/audio/hit.wav');
        this.load.audio('explosion', 'assets/audio/explosion.wav');
        this.load.audio('background', 'assets/audio/background.wav');
        this.load.audio('key_picked', 'assets/audio/key_picked.wav');
        this.load.audio('victory', 'assets/audio/victory.wav');
    }

    create() {
        this.scene.start('StartScene');
    }
}