# Space-Ball
<img width="738" alt="Screen Shot 2020-03-30 at 6 41 37 PM" src="https://user-images.githubusercontent.com/47997709/77978340-b4bb2780-72b6-11ea-90a3-6df82a68ec11.png">
## Overview

spaceJam is a multiplayer rocket league inspired game, where the goal is to collect balls in your team's goal.  Players use their ship to guide balls across the map, while also working to disrupt their opponents efforts.

## Functionality

* Players use 'WASD' keys to control their ship.
* Goal is to push balls toward the team's goal.

## Wireframe

App will initially consist of a signup / login screen.

Upon signup player will be led to a options screen where they can customize the color of their ship, and options to host / join a game.

Hosting / joining a game will lead the player to a lobby where they can see player count and option to leave / start the game.

Upon game start, the game canvas will render and players will be able to compete until the game winning score is reached.

## Technologies

* MERN stack (MongoDB, Express, React/Redux, Node)
* Canvas - used to render game components.
* Matter.js - physics library that controls object movement
* Socket.io - websocket library to enable multiplayer

## Architecture

### Backend
#### Database
  * Stuff about the database here
#### Server Game
  * Stuff about players and lobbies?
  
  * A Matter.js Engine is created for each Game instance
  * The Engine contains the World in which bodies exist and interact
  * Matter Bodies are instantiated for the arena boundaries, goals, and ball, and placed into the world. Collision filters determine which objects can collide with other objects.
    #### Ball:
    ``` javascript 
    this.ball = Bodies.circle(1900, 900, 100, {
        density: 0.04,
        friction: 0.2,
        frictionAir: 0.00001,
        restitution: 0.8,
        collisionFilter: {
            group: -1,
            category: 0x0001,
            mask: 0x1011
        }
    });
    ```
    #### Goal:
    ```javascript
    this.rightGoalBack = Bodies.rectangle(4035, 865, 500, 800, {
        isStatic: true,
        collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
        }
    });
    ```
  * Sensors are used along with collision filters to check whether the ball has passed completely through the goal in order to award points. These sensors are invisible and only used to detect collisions.
    #### Goal Sensor:
    ```javascript
    this.rightSensor = Bodies.rectangle(3937, 800, 500, 1000, {
            isStatic: true,
            isSensor: true,
            render: {
                visible: false
            },
        collisionFilter: {
            group: 0,
            category: 0x0011,
            mask: 0x0001
        }
    });
    ```
    
### Frontend

#### Components
#### Client Game
  * The game is rendered on a Canvas element
  * Game entities are cleared and redrawn when the client receives new game state
  * Canvas drawing follows player position by passing in ClientCamera instance
    #### When a new game is started, the game loop is initialized
    ```javascript
    init() {
        this.socket.on('initialize-others', data => {
            this.clearOthers(this.ctx, this.camera.xView, this.camera.yView);
            this.others = data.others.map(options => new Ship(this.ctx, options.user, options.team, options.ship))
        })
        this.socket.on('gameState', (data) => {
            this.cycleAll(data)
        });
        this.gameLoop();
    }
    ```
  * If a player is logged in, their customization options are passed to the game to render their selected ship appropriately
    #### Creating player's ship instance
    ```javascript
    this.self = new Ship(this.ctx, this.user, team, this.gameoptions.ship);
    ```
