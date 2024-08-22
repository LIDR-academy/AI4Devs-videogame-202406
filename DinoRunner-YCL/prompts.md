1. Give me the requirements for a clone of Dino Runner google video game I need:

   1. Game Review
   1. Technical Requirements: give me the best framework library HTML5/CSS/JS browser platform
   1. Game Components
   1. Functionality
   1. Game levels change

2. You are an expert video game developer. your task is to create a clone of Dino Runner video game using the requirements of the game_overview.md file. Add the library of Phaser.js as the framework using the CDN import. Take in account to split the code according to the code, for styles use main.css file, for js files use main.js file, all the html code should be in index.html file.

3. @phaser Add to the gamer the jump movement with the keyboard could be up arrow or space. Additionally allow the world to move and add random cactus to it.

4. Update the code to match with the dino and the ground sprite size is 45x56, the cactus sprite 24x56
5. the ground sprite is too small, it should be repeat it in the x axis until the border of the container
6. Change the container for the next specifications: width: 600px; height: 150px, background color white for the canvas.
7. Fix the cactus to fit the same ground as the dino, currently is below. Also the cactus appears and stay in the same x axis, the cactus should move with the world
8. The dinosaur is jumping higher than the height of the container, fix that
9. increase the container height to be 400px and apply all the physics logic and code for that
10. Add the sprite cloud.png to be part of the landscape, should be added to the world as random landscape, it means should star randomly positioned after 150 px height, and should move with the world in the x axis and then disappear.
11. The sprite cloud should start from the beginning and move with the world in the x axis, the y axis should be the same. The current behavior is the clouds are falling, because of gravity, fix that.
12. In the function "this.clouds.children.iterate(function (cloud) {" I am getting this error in the console Cannot read properties of undefined (reading 'x')
13. As an expert developer, your task is to enhance the game by adding an infinite number of levels. Each level should progressively increase in difficulty. Implement a scoring system that tracks the player's progress. Additionally, as the game speed increases with each level, ensure that the dino's jump velocity scales accordingly to maintain smooth and balanced gameplay.
14. The current score and level display are static and need to be dynamic. Update the score so that it increases based on how long the dino survives. The level should automatically increase every 15 seconds, gradually increasing the game's speed and the number of cacti. Ensure the scoreboard visibly updates in real-time to reflect the current score and level.
15. The dino's jump height is incorrectly increasing along the y-axis when the level is increasing. Instead of jumping higher, the dino should maintain the same height but complete the jump more quickly as the game progresses. Please adjust the code to ensure the jump speed increases without affecting the jump height.
16. As a gamer developer expert bring the best free fonts that are used for old games.
17. Add the Google Fonts - Press Start 2P font to the projec tand apply to all the text
18. Add the font size to the canvas
19. As a game developer expert, your task is to add the logic for a Start button to initiate the game. Additionally, implement a Game Over screen that displays the text 'Game Over,' along with the player's final score. Below the score, add a button labeled Restart that restarts the game when clicked. Use the 'Press Start 2P' font style for all new text, including the 'Game Over' message and button labels.
20. Update the Restart button to have the same style as the Start button. Modify the game logic so that after the user clicks the Restart button, the game starts immediately without requiring the user to press the Start button again
