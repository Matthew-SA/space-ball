# Space-Ball
[Space-Ball live link!](https://space-ball.herokuapp.com/#/)</br>
![b0WuTtD](https://user-images.githubusercontent.com/47997709/78061865-b4686e00-7342-11ea-9f98-909f7f1fbf55.gif)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Future Direction](#future-direction)

## Introduction

Space Ball is an online multiplayer game inspired by Rocket League.  Players compete against each other in teams of up to 3, attempting to knock a ball through their opponent's goal.  Playing with other players is made easy through an intuitive real time lobby system.

## Technologies

**Backend** <br/> 
Space Ball uses MongoDB, Express.js, Node.js as the foundation to its backend.  User accounts and preferences are stored in the MongoDB database.  All game logic is handled on the backend through Matter.js and transmitted through socket.io web sockets.

**Frontend** <br/> 
Space Ball's frontend pages are rendered with React/Redux.  Gameplay is displayed through a custom renderer in Canvas.  Client game data and lobby page information are recieved through socket.io web sockets.


## Features
* User Accounts - Allow players to customize their ship, select a new ball, add their scores to the game leaderboard, and display their nameplate to other players in game. <img width="1405" alt="Screen Shot 2020-03-30 at 9 24 38 PM" src="https://user-images.githubusercontent.com/47997709/77987039-93196a80-72cd-11ea-8db8-32d2820fc78e.png">
<br/> 

* Leaderboard - Player statistics are saved in the database.  The top players are prominently displayed on a public leaderboard!<img width="1043" alt="Screen Shot 2020-03-30 at 9 24 53 PM" src="https://user-images.githubusercontent.com/47997709/77987071-a62c3a80-72cd-11ea-8cf6-6c5e66b7157a.png">
<br/> 

* Lobby System - Makes joining or creating a new game easy.  Upon entering the lobby, players will be able to view all currently active games while also having the option of creating their own.  Entering a room will display all users in that room and allow for team-selection.<img width="936" alt="Screen Shot 2020-03-30 at 9 36 22 PM" src="https://user-images.githubusercontent.com/47997709/77987384-89443700-72ce-11ea-86da-796ac33cd34e.png"><img width="1047" alt="Screen Shot 2020-03-30 at 9 24 08 PM" src="https://user-images.githubusercontent.com/47997709/77987003-7b41e680-72cd-11ea-8e27-c4d42db9d0aa.png">
<br/> 

* Real time gameplay - Up to 6 players per game receive game state updates 60 times per second.
<br/> 

## Architecture

### Backend
#### Database
  * CRUD functions for user accounts, currency, options, leaderboards/stats, and ball/ship purchases
  are authenticated using JSON web tokens and Passport.js. Validated requests communicate with MongoDB via 
  Mongo Shell methods.

    ``` javascript
    router.patch("/selectship", passport.authenticate("jwt", { session: false }),
      (req, res) => {
        Inventory.findOneAndUpdate(
          { username: req.user.username},
          { $set: {"gameoptions.ship": req.body.gameoptions} }
        )
        .then(selected => {
          return res.json(selected);
        })
        .catch(err => {
          return res.status(404).json(err);
        });
      });
    ```

  * HTTP requests are made via Axios, which transforms JSON data and supports JavaScript promises

    ``` javascript
    export const addShip = ship => dispatch => {
    axios
      .patch("/api/inventory/addship", { ship: ship })
      .then(res =>
        dispatch({
          type: ADD_SHIP,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: RECEIVE_ERRORS,
          payload: err
        })
      );
    };
    ```
  
#### Server
  * Web sockets listen for and sends specific information to specific clients.  Clients in the lobby will only receive game listings.  Clients in games will only receive information related to their game. 

    ``` javascript
    socket.on('join-game', data => {
      if (!gameList[data.room]) {
        gameList[data.room] = new ServerGame(io, data.room)
        io.in('room-lobby').emit('update-gamelist', Object.keys(gameList))
      }
      gameList[data.room].addPlayer(socket.id, data.username, data.options)
    });

    socket.on('player-action', data => {
      let game = gameList[data.room];
      game.movePlayer(socket.id, data)
    });

    socket.on('leave-game', roomNum => {
      let game = gameList[roomNum]
      game.removePlayer(socket.id)
      if (game.roster.size <= 0) destroyGame(roomNum)
     })
    ```
#### Server Game
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
## Future Direction
* Power-ups and usable ship abilities.
* Chat implementation for lobbies.
* Chat implementation for in game.
* Spectating option.
* Ability to rejoin game in progress.
