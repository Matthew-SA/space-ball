# Space-Ball
<img width="738" alt="Screen Shot 2020-03-30 at 6 41 37 PM" src="https://user-images.githubusercontent.com/47997709/77978340-b4bb2780-72b6-11ea-90a3-6df82a68ec11.png">

## Table of Contents
1. Introduction
2. Technologies
3. Features
4. Future Direction

## Introduction

Space Ball is an online multiplayer game heavily inspired by Rocket League.  Players compete against each other in teams of up to 3, attempting to knock a ball through their opponent's goal.  Playing with other players is made easy through an intuitive real time lobby system.

## Technologies
**MongoDB**

**Express**

**Node.js**

**React / Redux**
React / Redux is employed to keep track of a user's profile information, ship customization, and socket ID.

**Matter-js**
Space Ball takes advantage of the matter-js engine to assist in handling game logic on the backend.  Game objects are displayed to users on the frontend through a custom renderer.

**Socket.io**
Space Ball real time gameplay is made possible through the use of socket.io web sockets.  In addition to handling the transmission of game data, web sockets are also employed in the lobby system in order to provide real time updates.


## Features
* User Accounts - Allow players to customize their ship, add their scores to the game leaderboard, and display their nameplate to other players in game.

* Lobby System - Makes joining or creating a new game easy.  Upon entering the lobby, players will be able to view all currently active games while also having the option of creating their own.  Entering a room will display all users in that room and allow for team-selection.

* Real time gameplay - Up to 6 players per game receive game state updates 60 times per second.


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
