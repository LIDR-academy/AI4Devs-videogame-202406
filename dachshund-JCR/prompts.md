Where is the best framework for HTML5/CCS3/Javascript browser platform game as Pac-man?
You are an expert game developer. Your task is to setup the structure for a ligthweight *Pac-man clone* using *PixiJS* a game framework.
I do not want to write any line of code myself, so please handle all the necessary file creation and setup.
First, create the following project structure:
- dachshund-game/
	-index.html
	-main.js
	-assets/
		-images/
		-audio/
		
Execute the necessary commands using python to create these directories and files.
Once the structure is created, populate 'index.html' and 'main.js' and verify PixiJS is correctly added.


You are an expert game developer. Your task is to continue setting up the lightweight Pac-man clone using PixiJS. We have already created the basic project structure, 
and the initial HTML and Javascript files are set up.
Next, we need to:
1. Add a player character to the game, this character is a dachshund dog.
2. Ensure the player character can move left, right, up and bottom using the keyboard.

We have the following sprites located in the assets/images/ directory:
- won.png
- eat.png
- idle.png
- run.png
- smell.png

The name are for describing the action each sprite is intended for.
So, use Idel.png when no movement, the run one the moving, eat when eating a food, etc. It's a character with
multiple sprits and each one is full for each action.

Please handle all the necesary file updates and configurations to achieve this. Once done, test the game to 
ensure the player character can move and eat as expected.
@PixiJS

Uncaught ReferenceError: PIXI is not defined
    at main.js:1:13

When I verify the url: https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.2.1/pixi.min.js, error is 404 Not Found	

The correct URL is: https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.min.js

Access to image at 'file:///G:/My%20Drive/AI4Devs/week%206/game/dachshund-game/assets/images/idle.png' from origin 
'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: 
http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.


Now, we need to add a maze that our dog can navigate through, it must have a width of 64x64 pixels, which corresponds 
to the size of our character. You must ensure that the dog does not go over the walls of the maze.

We want a maze with a white background and yellow walls. We need to add food that the dog can eat with a limit of portions; 
this way when the dog has eaten all the portions the game ends. It is important to have a score, each time the dog eats it 
the score increases. Add enemy characters, these can be other dogs that also eat the portions that the player has not eaten yet.


The food still does not disappear as the player passes over it, you could hide the food when the player passes 
over it by pretending that he has eaten it.

Use assets/images/chicken.png for show food

Food should be placed randomly and not throughout the maze.

maze size is width: 800px, height: 600px

Enemy characters must be represented with the image assets/images/bulldog.png and must move randomly through the maze.

The 15 portions of food are not being displayed on the maze, on some occasions I have only found 12 or 13. 
Additionally, the enemies are not moving through the maze, they stay in one place, I require them to move through the maze. maze.


Enemies must move fluidly through the maze.

When moving from bottom to top it should show the image present in assets/images/run.png

Change the game title for Angry Dushshund 