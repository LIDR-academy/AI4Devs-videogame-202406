# Prompts

## Prompt 1

Como experto en desarrollo de juegos, especialmente utilizando la biblioteca Phaser para JS. Necesito que ayudes a crear un juego inspirado en el clásico de arcade "New Rally X". El juego debe capturar la escencia del original.

Característivas clave del juego original:

1. El jugador controla un automovil en un laberinto
2. El objetivo es recolectar todas las banderas en el nivel mientras se evitan autos enemigos
3. El jugador puede soltar espuma para bloquear a los enemigos.

Cree los archivos bases para el proyecto:

-   index.html
-   main.js
-   assets/styles.css
-   assets/images/

Los primero que deberías hacer es:

-   Agrega lo necesario al index.html para HTML5
-   Incluye los scripts necesarios para Phaser (versión 3.x).
-   Configura el objeto de configuración de Phaser con las dimensiones del juego y las escenas necesarias.
-   Crea la instancia del juego con la configuración.

## Prompt 2

Lo siguiente es crear las escenas del juego:

-   Escena de carga (preload): para cargar todos los assets.
-   Escena de menú principal: para iniciar el juego.
-   Escena de juego principal: donde ocurre la acción del juego.
-   Escena de fin de juego: para mostrar el puntaje final y reiniciar.

## Prompt 3

Ahora implementaras la mecanica básica del juego:

-   Crear un laberinto utilizando tiles (similar al original New Rally X).
-   Implementar el movimiento del automovil del jugador con las teclas de dirección.
-   Añadir colisiones entre el automovil y las paredes del laberinto.

## Prompt 4

De acuerdo al codigo anterior, cuales serían las caracteristicas del tiles.png y el car.png? En ambos casos me refiero a dimiensiones y en el caso del tiles.png en su contenido?

## Prompt 5

Ahora creame un mapa básico en el assets/tilemaps/map.json

## Prompt 6

La imagen del auto tiene una dimensión de 32px de largo y 16px de ancho

## Prompt 7

No se ve bien el vehiculo en el laberinto y los colores tileset no ven los dos que inclui.

## Prompt 8

Explicame bien como funciona el map.json para entender si están bien los colores del tileset

## Prompt 9

Perfecto, entonces ajusta el data para que cosidere el 2 como pared y el 3 como suelo

## Prompt 10

En mi tileset el 1 sería un bloque transparente, lo podrías reemplazar por el 0?

## Prompt 11

De acuerdo al mapa y el tileset, el car solo debería poder moverse por código 3 del tileset y eso no lo esta respetando hasta ahora.

También me llama la atención que el groundLayer, que justamente corresponde a la parte por donde pasa el auto, no se esta utilizando en el mainl.js.

## Prompt 12

main.js:124 Uncaught TypeError: Cannot read properties of null (reading 'pixelX') at GameScene.findPlayerStartPosition (main.js:124:27) at GameScene.create (main.js:53:42) at initialize.create (phaser.min.js:1:491015) at initialize.loadComplete (phaser.min.js:1:490466) at o.emit (phaser.min.js:1:7809) at initialize.loadComplete (phaser.min.js:1:944358) at initialize.fileProcessComplete (phaser.min.js:1:944058) at t.onProcessComplete (phaser.min.js:1:21253) at data.onload (phaser.min.js:1:91778)

## Prompt 13

Mi tileset tiene 3 cuadros de 32x32 pixeles, donde el primero es un cuadro transparente, el segundo es para los muros y el tercero corresponde al suelo de acuerdo a algunas indicaciones que me diste anteriormente. Entiendo que en cada capa del mapa, el cuadro transparente debería estar donde esta el cuadro de color en la otra capa, me explico. Por ejemplo:

Si la capa Wall hubiera algo así en la primera fila: 1,1,1,1,1,2,2 En la capa Ground debería ser algo así: 3,3,3,3,3,1,1

Lo anterior es solo un ejemplo. Es solo para verificar si entendi como funciona el map.

## Prompt 14

Revisa mi mi json de configuración a ver si encuentras algún problema

## Prompt 15

Entiendo, dado que en cuanto a configuración mi map se encuentra bien configurado, necesito que revises mi main.js @main.js ya que estoy teniendo algunos problemas:

Las capa configurada como Ground no se esta viendo cuando la pagina web se carga.

## Prompt 16

Excelente, ahora se ve mucho mejor. Necesitamos ajustar el movimiento y tamaño del car. En la imagen car.png la punta del vehículo esta hacia arriba y con la configuración el automovil se mueve de costado.

## Prompt 17

El vehiculo sigue avanzando de costado, entendería que se esta tomando el vehículo como si la parte delantera del auto estuviera hacia la derecha.

## Prompt 18

Tengo un error en la siguiente linea:

wallsLayer.setCollisionByProperty({ collides: true });

Este es el error: phaser.min.js:1 Uncaught TypeError: Cannot read properties of undefined (reading '0') at t.exports [as SetCollisionByProperty] (phaser.min.js:1:1006899) at initialize.setCollisionByProperty (phaser.min.js:1:680866) at GameScene.create (main.js:49:20) at initialize.create (phaser.min.js:1:491015) at initialize.bootScene (phaser.min.js:1:490336) at initialize.start (phaser.min.js:1:494019) at initialize.processQueue (phaser.min.js:1:489078) at initialize.update (phaser.min.js:1:490562) at initialize.step (phaser.min.js:1:793006) at initialize.step (phaser.min.js:1:433503)

Es sucede al hacer click en "Iniciar Juego".

Por otra parte, cuando cargo por primera vez la página me sale esto:

VM280:1 Uncaught (in promise) SyntaxError: "[object Object]" is not valid JSON at JSON.parse (<anonymous>) at l.\_storageChangeDispatcher (content.js:2:855976) at \_storageChangeDispatcherCallback (content.js:2:855424)

No sé si tienen alguna relación ambos errores.

## Prompt 19

Parece que el problema esta en el map.json, al parecer el Walls y Ground, entiendo que es una matriz de 30 por 30 elementos en el data @map.json , pero parece que 29 x 30 o algo así. Lo puedes verificar?
