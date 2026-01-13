class NextLevelScene extends Phaser.Scene {
    constructor() {
        super('NextLevelScene');
    }

    create() {
        this.add.text(400, 300, 'Next Level', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 350, 'Press SPACE to continue', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        this.time.delayedCall(1000, () => {
            this.input.keyboard.once('keydown-SPACE', () => {
                // Reiniciar valores antes de iniciar el siguiente nivel
                const gameScene = this.scene.get('GameScene');
                gameScene.timeLeft = gameScene.INITIAL_TIME;
                gameScene.health = gameScene.INITIAL_HEALTH;
                this.registry.set('health', gameScene.INITIAL_HEALTH);
                this.registry.set('leftTime', gameScene.INITIAL_TIME);
                // Mantener la puntuación actual
                const currentScore = this.registry.get('score') || 0;
                this.scene.start('GameScene', { score: currentScore });
            });
        });
    }
}