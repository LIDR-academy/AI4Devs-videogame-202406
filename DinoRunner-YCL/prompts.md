# Dino Runner Clone Requirements

## 1. Game Overview

Provide a detailed review of the Dino Runner game, including its main features and gameplay mechanics.

## 2. Technical Requirements

- Identify the best framework/library for HTML5/CSS/JS browser platform.
- Use Phaser.js as the framework, imported via CDN.

## 3. Game Components

- List and describe the main components of the game.

## 4. Functionality

- Detail the core functionalities required for the game.

## 5. Game Levels

- Explain how the game levels should change and progress.

## 6. Development Instructions

As an expert video game developer, your task is to create a clone of the Dino Runner video game using the requirements from the `game_overview.md` file. Follow these guidelines:

1. **Framework**: Use Phaser.js as the framework, imported via CDN.
2. **Code Structure**:
   - HTML code should be in `index.html`.
   - CSS styles should be in `main.css`.
   - JavaScript code should be in `main.js`.

## 7. Specific Features and Fixes

1. **Jump Movement**: Add jump movement using the up arrow or space key. Allow the world to move and add random cacti.
2. **Sprite Sizes**: Update the code to match the dino and ground sprite size (45x56) and the cactus sprite size (24x56).
3. **Ground Sprite**: Ensure the ground sprite repeats along the x-axis until the border of the container.
4. **Container Specifications**: Set the container to `width: 600px; height: 150px; background-color: white`.
5. **Cactus Positioning**: Fix the cactus to align with the ground and move with the world.
6. **Jump Height**: Ensure the dinosaur does not jump higher than the container height.
7. **Container Height**: Increase the container height to 400px and adjust the physics logic accordingly.
8. **Cloud Sprite**: Add the `cloud.png` sprite to the landscape, starting randomly after 150px height, moving with the world along the x-axis, and disappearing.
9. **Cloud Behavior**: Fix the cloud behavior to prevent it from falling due to gravity.
10. **Error Handling**: Resolve the error in the function `this.clouds.children.iterate(function (cloud) {` where `Cannot read properties of undefined (reading 'x')`.

## 8. Game Enhancements

1. **Infinite Levels**: Add infinite levels with progressively increasing difficulty. Implement a scoring system that tracks the player's progress. Ensure the dino's jump velocity scales with the game speed.
2. **Dynamic Score and Level Display**: Update the score to increase based on survival time. Automatically increase the level every 15 seconds, increasing game speed and the number of cacti. Ensure the scoreboard updates in real-time.
3. **Jump Speed**: Adjust the code to ensure the dino's jump speed increases without affecting the jump height.
4. **Fonts**: Use the best free fonts for old games. Add the Google Fonts - Press Start 2P font to the project and apply it to all text.
5. **Start and Restart Buttons**: Add a Start button to initiate the game. Implement a Game Over screen displaying 'Game Over' and the player's final score, with a Restart button to restart the game. Use the 'Press Start 2P' font style for all new text. Ensure the Restart button has the same style as the Start button and modify the game logic to start immediately after clicking Restart.
