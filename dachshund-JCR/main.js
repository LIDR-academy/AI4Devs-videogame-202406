// main.js
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xFFFFFF, // Fondo blanco
});
document.getElementById('game-container').appendChild(app.view);

// Cargar las texturas de los sprites
const textures = {
    idle: PIXI.Texture.from('assets/images/idle.png'),
    run: PIXI.Texture.from('assets/images/run.png'),
    run_right: PIXI.Texture.from('assets/images/run_right.png'), // Textura para correr a la derecha
    run_left: PIXI.Texture.from('assets/images/run_left.png'), // Textura para correr a la izquierda
    eat: PIXI.Texture.from('assets/images/eat.png'),
    smell: PIXI.Texture.from('assets/images/smell.png'),
    won: PIXI.Texture.from('assets/images/won.png'),
    food: PIXI.Texture.from('assets/images/chicken.png'), // Textura de la comida
    enemy: PIXI.Texture.from('assets/images/bulldog.png') // Textura del enemigo
};

// Crear el sprite del jugador
const player = new PIXI.Sprite(textures.idle);
player.x = 64; // Posición inicial del jugador
player.y = 64;
player.anchor.set(0.5);
app.stage.addChild(player);

// Variables de movimiento
let speed = 5;
let keys = {};

// Definir el laberinto (1 = pared, 0 = espacio vacío)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Dibujar el laberinto
const tileSize = 64;
for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
        if (maze[row][col] === 1) {
            const wall = new PIXI.Graphics();
            wall.beginFill(0x00FF00); // Paredes verdes
            wall.drawRect(col * tileSize, row * tileSize, tileSize, tileSize);
            wall.endFill();
            app.stage.addChild(wall);
        }
    }
}

// Colocar comida aleatoriamente
const foodPositions = [];
const foodGraphics = [];
const foodCount = 15; // Número de porciones de comida

function isReachableFromStart(row, col) {
    const startRow = Math.floor(player.y / tileSize);
    const startCol = Math.floor(player.x / tileSize);
    const visited = new Set();
    const queue = [[startRow, startCol]];

    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        if (currentRow === row && currentCol === col) {
            return true;
        }
        const key = `${currentRow},${currentCol}`;
        if (visited.has(key)) {
            continue;
        }
        visited.add(key);

        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];
        for (let [dx, dy] of directions) {
            const newRow = currentRow + dx;
            const newCol = currentCol + dy;
            if (maze[newRow] && maze[newRow][newCol] === 0) {
                queue.push([newRow, newCol]);
            }
        }
    }
    return false;
}

let attempts = 0;
while (foodPositions.length < foodCount && attempts < 1000) {
    const row = Math.floor(Math.random() * maze.length);
    const col = Math.floor(Math.random() * maze[0].length);

    if (maze[row][col] === 0 && isReachableFromStart(row, col)) {
        const food = new PIXI.Sprite(textures.food);
        food.x = col * tileSize + tileSize / 2;
        food.y = row * tileSize + tileSize / 2;
        food.anchor.set(0.5);
        app.stage.addChild(food);
        foodPositions.push({ x: food.x, y: food.y, eaten: false });
        foodGraphics.push(food);
        maze[row][col] = 2; // Marcar la posición como ocupada por comida
    }
    attempts++;
}

// Variables de puntaje
let score = 0;

// Mostrar el puntaje
const scoreText = new PIXI.Text('Score: 0', { fontSize: 24, fill: 0x000000 });
scoreText.x = 10;
scoreText.y = 10;
app.stage.addChild(scoreText);

// Crear enemigos
const enemies = [];
for (let i = 0; i < 3; i++) {
    const enemy = new PIXI.Sprite(textures.enemy);
    enemy.x = (i + 1) * tileSize * 2;
    enemy.y = (i + 1) * tileSize * 2;
    enemy.anchor.set(0.5);
    enemy.direction = Math.floor(Math.random() * 4); // Dirección inicial aleatoria
    app.stage.addChild(enemy);
    enemies.push(enemy);
}

// Manejar eventos de teclado
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    updatePlayerTexture();
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    updatePlayerTexture();
});

// Actualizar la textura del jugador según el movimiento
function updatePlayerTexture() {
    if (keys['ArrowRight']) {
        player.texture = textures.run_right;
    } else if (keys['ArrowLeft']) {
        player.texture = textures.run_left;
    } else if (keys['ArrowUp'] || keys['ArrowDown']) {
        player.texture = textures.run;
    } else {
        player.texture = textures.idle;
    }
}

// Función de actualización del juego
app.ticker.add(() => {
    let newX = player.x;
    let newY = player.y;

    if (keys['ArrowUp']) {
        newY -= speed;
    }
    if (keys['ArrowDown']) {
        newY += speed;
    }
    if (keys['ArrowLeft']) {
        newX -= speed;
    }
    if (keys['ArrowRight']) {
        newX += speed;
    }

    // Verificar colisiones con las paredes
    if (!isCollidingWithWalls(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    // Verificar colisiones con la comida
    for (let i = 0; i < foodPositions.length; i++) {
        const food = foodPositions[i];
        if (!food.eaten && Math.hypot(player.x - food.x, player.y - food.y) < tileSize / 2) {
            food.eaten = true;
            player.texture = textures.eat; // Cambiar la textura a "comer"
            foodGraphics[i].visible = false; // Ocultar la comida
            score++;
            scoreText.text = `Score: ${score}`;
        }
    }

    // Movimiento de enemigos
    enemies.forEach(enemy => {
        let enemyNewX = enemy.x;
        let enemyNewY = enemy.y;

        switch (enemy.direction) {
            case 0: // Arriba
                enemyNewY -= speed / 2;
                break;
            case 1: // Abajo
                enemyNewY += speed / 2;
                break;
            case 2: // Izquierda
                enemyNewX -= speed / 2;
                break;
            case 3: // Derecha
                enemyNewX += speed / 2;
                break;
        }

        if (!isCollidingWithWalls(enemyNewX, enemyNewY)) {
            enemy.x = enemyNewX;
            enemy.y = enemyNewY;
        } else {
            enemy.direction = Math.floor(Math.random() * 4); // Cambiar dirección al azar si hay colisión
        }

        // Verificar colisiones de enemigos con la comida
        for (let i = 0; i < foodPositions.length; i++) {
            const food = foodPositions[i];
            if (!food.eaten && Math.hypot(enemy.x - food.x, enemy.y - food.y) < tileSize / 2) {
                food.eaten = true;
                foodGraphics[i].visible = false; // Ocultar la comida
            }
        }
    });

    // Verificar si toda la comida ha sido consumida
    if (foodPositions.filter(f => !f.eaten).length === 0) {
        alert('¡Juego terminado! Toda la comida ha sido consumida.');
        app.ticker.stop();
    }
});

// Función para verificar colisiones con las paredes
function isCollidingWithWalls(x, y) {
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);

    if (maze[row] && maze[row][col] === 1) {
        return true;
    }
    return false;
}