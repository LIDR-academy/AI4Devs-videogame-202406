class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 350, 'Presiona ESPACIO para reiniciar', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        this.input.keyboard.once('keydown-SPACE', () => {
            // Reiniciar valores antes de iniciar una nueva partida
            const gameScene = this.scene.get('GameScene');
            gameScene.timeLeft = gameScene.INITIAL_TIME;
            gameScene.health = gameScene.INITIAL_HEALTH;
            this.registry.set('health', gameScene.INITIAL_HEALTH);
            this.registry.set('leftTime', gameScene.INITIAL_TIME);
            this.registry.set('score', 0); // Reiniciar la puntuación también
            this.scene.start('GameScene');
        });
    }
}