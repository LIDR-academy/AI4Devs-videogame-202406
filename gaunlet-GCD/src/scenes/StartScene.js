class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        const { width, height } = this.scale;

        // Título del juego
        this.add.text(width / 2, height / 6, 'Gauntlet Archer', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Instrucciones
        const instructions = [
            'How to play:',
            '',
            '- Use the arrow keys to move the archer',
            '- Press SPACE to shoot arrows',
            '- Eliminate the enemies',
            '- Collect the key and find the door',
            '- Survive as long as possible',
            '',
            'Objective:',
            'Get the highest score before',
            'time runs out or you lose all your health'
        ];

        const instructionsText = this.add.text(width / 2, height / 3, instructions, {
            fontSize: '22px', // Reducido de 24px a 22px
            fill: '#fff',
            align: 'center',
            lineSpacing: 8 // Reducido de 10 a 8
        }).setOrigin(0.5, 0);

        // Calcular la altura total del texto de instrucciones
        const instructionsHeight = instructionsText.height;

        // Ajustar la posición vertical del texto de instrucciones
        instructionsText.setY(height / 2 - instructionsHeight / 2);

        // Texto para iniciar el juego
        this.add.text(width / 2, height - 50, 'Press SPACE to start', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Escuchar el evento de tecla espacio
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}