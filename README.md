## Geometry Wars - Pacifism Mode

### Background

Geometry Wars is a 2D game, where the objective is to survive as long as possible and score as many points as possible by destroying enemy ships. This project will implement Geometry Wars - Pacificism mode.

Pacifism mode is played on a rectangular field, where the player controls a ship and its movements using the mouse. However unlike other modes, the player's ship does not have a cannon equipped to destroy enemy ships. Instead the player must navigate through "Gates" in order to destroy enemies. When a player passes through a Gate any enemies within a certain radius of the Gate will be destroyed. Enemies spawn in groups in the four corners of the field. As the player progresses, the amount of enemies spawned will increase, until the player loses. A player will lose if an enemy ship touches their ship or if the player runs into the side of a Gate.

### Functionality & MVP

This implementation will allow users to:

- [ ] Control a ship using the mouse as input
- [ ] Navigate away from enemies
- [ ] Fly through gates to destroy enemies

In addition, this project will include:

- [ ] An about modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with a game board, game controls, and nav links to my Github, my LinkedIn and the About modal. At the start of the game, the player will spawn at the center of the board. A player will have the opportunity to fly around for a little bit, before gates and enemies begin to spawn.

![wireframe](/images/pacifism_wireframe.png)

### Architecture and Technologies

This project will be implmemented with the following technologies:
- Vanilla JavaScript and `jquery` for overall structure and game logic.
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering.
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be other scripts involved in the project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`game.js`: this script will handle the game logic. It will hold the score of the player and will spawn the gates and enemies accordingly.

`moving_object.js`: this script will set up the base functionality for all moving objects including enemies and the player's ship.

`ship.js`: this script will house the constructor and moving functions for the Ship object

`enemy.js`: this script will house the constructor and moving pattern for Enemy objects.

`gate.js`: this script will house the constructor and moving pattern for Gate objects.


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed. Additionally create a `webpack.config.js` and a `package.json`. Write a basic entry file. Learn the basics of `Easel.js`. Goals for the day:

- Setup webpack
- Render player ship onto `Canvas` element

**Day 2**: Build `MovingObject`, `Ship`, and `Enemy` object. Connect `Ship` and `Enemy` object to `Board` object. Then use `board.js` to create and render the a ship and enemy. Build the ability to control the ship using mouse input. Goals for the day:

- Complete the `moving_object.js`, `ship.js`, and `enemy.js`
- Render a ship to `Canvas` using `Easel.js`
- Make ship flyable
- Make enemies have specified moving pattern.

**Day 3**: Build `gate.js` and add this object to the board. Create the functionality for game and different objects. Example if player crashes into enemy, they lose. Goals for the day:

- Build `Gate` object.
- Implement game logic for crashing into enemies and flying through gates.

**Day 4**: Finish up any functionality not already implemented. Style the frontend, making it polished and professional. Goals for the day:

- Style `Canvas`, nice looking controls and title.
- Finish app

### Bonus Features

- [ ] Add another enemy type
- [ ] Add soundtrack
- [ ] Add other game mode, where gates are not spawned and ship has a cannon
