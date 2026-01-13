class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        const { width, height } = this.scale;

        // Estilo común para todos los textos
        const textStyle = { fontSize: '20px', fill: '#fff' };

        // Puntuación (arriba a la izquierda)
        this.add.text(10, 10, 'Score', textStyle).setOrigin(0, 0);
        this.scoreText = this.add.text(10, 35, this.registry.get('score').toString(), textStyle).setOrigin(0, 0);

        // Tiempo (arriba en el centro)
        this.add.text(width / 2, 10, 'Time', textStyle).setOrigin(0.5, 0);
        this.timeText = this.add.text(width / 2, 35, this.registry.get('leftTime').toString(), textStyle).setOrigin(0.5, 0);

        // Vida (arriba a la derecha)
        this.add.text(width - 10, 10, 'Health', textStyle).setOrigin(1, 0);
        this.healthText = this.add.text(width - 10, 35, this.registry.get('health').toString(), textStyle).setOrigin(1, 0);

        this.registry.events.on('changedata', this.updateData, this);
    }

    updateData(parent, key, data) {
        if (key === 'score') {
            this.scoreText.setText(data.toString());
        } else if (key === 'health') {
            this.healthText.setText(data.toString());
        } else if (key === 'leftTime') {
            this.timeText.setText(data.toString());
        }
    }
}