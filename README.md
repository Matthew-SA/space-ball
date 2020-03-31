# Space-Ball
<img width="738" alt="Screen Shot 2020-03-30 at 6 41 37 PM" src="https://user-images.githubusercontent.com/47997709/77978340-b4bb2780-72b6-11ea-90a3-6df82a68ec11.png">

## Table of Contents
1. Introduction
2. Technologies
3. Features
4. Future Direction

## Introduction

Space Ball is an online multiplayer game inspired by Rocket League.  Players compete against each other in teams of up to 3, attempting to knock a ball through their opponent's goal.  Playing with other players is made easy through an intuitive real time lobby system.

## Technologies

**Backend** <br/> 
Space Ball uses MongoDB, Express, Node.js as the foundation to its backend.  User accounts and preferences are stored in the MongoDB noSQL database.  All game logic is handled on the backend through Matter.js and transmitted through socket.io web sockets.

**Frontend** <br/> 
Space Ball's frontend pages are rendered with React/Redux.  Gameplay is displayed through a custom renderer in Canvas.  Client game data and lobby page information are recieved through socket.io web sockets.


## Features
* User Accounts - Allow players to customize their ship, select a new ball, add their scores to the game leaderboard, and display their nameplate to other players in game. <img width="1405" alt="Screen Shot 2020-03-30 at 9 24 38 PM" src="https://user-images.githubusercontent.com/47997709/77987039-93196a80-72cd-11ea-8db8-32d2820fc78e.png">
<br/> 

* Leaderboard - Player statistics are saved in the database.  The top players are prominently displayed on a public leaderboard!<img width="1043" alt="Screen Shot 2020-03-30 at 9 24 53 PM" src="https://user-images.githubusercontent.com/47997709/77987071-a62c3a80-72cd-11ea-8cf6-6c5e66b7157a.png">
<br/> 

* Lobby System - Makes joining or creating a new game easy.  Upon entering the lobby, players will be able to view all currently active games while also having the option of creating their own.  Entering a room will display all users in that room and allow for team-selection.<img width="936" alt="Screen Shot 2020-03-30 at 9 36 22 PM" src="https://user-images.githubusercontent.com/47997709/77987384-89443700-72ce-11ea-86da-796ac33cd34e.png"><img width="1047" alt="Screen Shot 2020-03-30 at 9 24 08 PM" src="https://user-images.githubusercontent.com/47997709/77987003-7b41e680-72cd-11ea-8e27-c4d42db9d0aa.png">
<br/> 

* Real time gameplay - Up to 6 players per game receive game state updates 60 times per second. ![3s93THt](https://user-images.githubusercontent.com/47997709/77986404-d2df5280-72cb-11ea-861e-8427482c2b7f.gif)
<br/> 

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
