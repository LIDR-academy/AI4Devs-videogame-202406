#Gaunlet - GCD

Eres un desarrollador de videojuegos. Tienes que crear un video juego al estilo de Gaunlet. Conoces alguna librería javascript que sirva para crar el juego?

Como diseñador de videojuegos. Crea un juego al estilo Gaunlet usando la librería Phaser de javascript (https://newdocs.phaser.io/docs/3.80.0) con las siguientes especificaciones:
  - Esta versión será para un solo jugador. 
  - El personaje será un arquero que dispará flechas que haran una cantidad limitada de daño a los enemigos.
  - El jugador empezará con una cantidad limitada de vida.
  - Tendrá distintos enemigos con velocidades y vida diferente. Al matarlos sumarán una cantidad de puntos del personaje equivalente a su vida máxima.
  - Los enemigos estarán situados por el nivel de forma aleatoria y correrán a por el personaje cuando estén cerca.
  - Cuando un enemigo golpee al personaje explotará y restará una cantidad de vida al personaje.
  - Si el personaje alcanza con una flecha a un enemigo le restará una cantidad limitada de vida.
  - El jugador tendrá un límite de tiempo para completar el nivel.
  - Si la vida del jugador llega a 0 o se termina el tiempo para completar el nivel se terminará la partida. 
  - Los niveles serán ilimitados y se crearán de forma aleatorea cada vez que el jugador complete el nivel anterior o al comienzo de la partida.
  - Cuando el personaje muera aparecerá un mensaje de Game Over y un botón para volver a comenzar la partida
  - La interfaz de usuario mostrará la vida restante del personaje, el tiempo restante para terminar la partida y la puntuación actual.
  - El personaje se moverá usando las flechas del teclado y dispará usando la barra espaciadora.
  - El personaje avanzará al siguiente nivel cuando encuentre la llave y llegue a la puerta.

  Entregable: Crea la estructura de carpetas y ficheros necesarios usando buenas prácticas
  

Las imágenes tienen un tamaño muy grande. ¿Como puedo cambiar su tamaño?

Las flechas no se mueven (ChatGPT)

Las flechas no se mueven. Podrías corregirlo? (Llama3.1)

Haz que el tiempo restante vaya disminuyendo cada segundo y que cuando llege a 0 se acabe la partida

Haz que el archero se mire hacia la izquierda cuando se desplace hacia la izquierda

Cambia la posición de los datos de la UI:
- La puntuación estará arriba a la izquierda mostrando el texto 'Score' y debajo la puntuación actual.
- El tiempo restante estará arriba en el centro mostrando el texto 'Time' y debajo el tiempo restante.
- La vida restante estará arriba a la derecha mostrando el texto 'Health' y debajo la vida restante.

Reduce un poco el tamaño de la interfaz para dejar más espacio para el mapa

La zona de juego no debería tocar la interfaz y debería tener un borde visible para que el jugador sepa donde están los límites

Agrega movimiento a los enemigos para que se muevan de forma aleatoria por la pantalla

Haz que todos los enemigos comiencen a moverse a la vez

Cada vez que se inicie un nuevo nivel, el tiempo restante y la vida se reseteará a su valor inicial

Haz que suene el efecto de sonido 'hit' cada vez que una flecha golpee a un enemigo

Modifica la creación de enemigos para nuncan aparezcan a menos de 100 pixeles del personaje

Agrega un sonido de fondo para la gamescene usando el fichero 'background.wav'

Crea una pantalla de inicio que aparezca al arrancar el juego donde el usuario tenga que pulsar la tecla espacio para empezar la partida

Haz que la música de fonde tenga la mitad de volumen que el resto de efectos de sonido

Haz que el personaje no pueda moverse hasta que empiecen a moverse los enemigos

haz que suene el efecto de sonido 'key_picked' cuando el personaje recoja la llave

Haz que suene el efecto de sonido 'victory' cuando el personaje complete un nivel, que todo se pause mientras suena y que no aparezca la escena 'NextLevel' hasta que termine el sonido.

Haz que los enemigos empiecen a moverse justo cuando el personaje pueda empezar a moverse también

HAz que el tiempo y la vida se reseteen cuando se comienza otra partida despues de un game over

Haz que la música de fondo deje de sonar cuando la partida termina