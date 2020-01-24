import React from 'react';
// import GameView from "../../classes/game_view";
import Game from "../../classes/game";
import Matter from "matter-js";
// import Util from "./util/util";
import key from "keymaster";


class GameComponent extends React.Component {
  componentDidMount() {
    var canvas = document.getElementById("game-canvas");

    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;
    var render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        background: "#000000",
        wireframes: false,
        showAngleIndicator: false
      }
    });
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
   
    var ship = Matter.Bodies.circle(50, 50, 30, {
      density: 1
    })

    Matter.World.add(world, ship);

    var ball = Matter.Bodies.circle(250, 250, 50, {
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
      render: {
        fillStyle: "#F35e66",
        strokeStyle: "black",
        lineWidth: 1
      }
    });
    Matter.World.add(world, ball);

    var ceiling = Matter.Bodies.rectangle(0, 0, 2000, 40, {
      isStatic: true, 
      render: {
        // visible: false
      }
    });
    Matter.World.add(world, ceiling);

    var floor = Matter.Bodies.rectangle(0, 600, 2000, 40, {
      isStatic: true, 
      render: {
        // visible: false
      }
    });
    Matter.World.add(world, floor);

    key('w', () => {
      Matter.Body.applyForce(ship, ship.position, {
        x: 0,
        y: -10
      });
    })
    
    key('s', () => {
      Matter.Body.applyForce(ship, ship.position, {
        x: 0,
        y: 10
      });
    })
    key('a', () => {
      Matter.Body.applyForce(ship, ship.position, {
        x: -10,
        y: 0
      });
    })
    key('d', () => {
      Matter.Body.applyForce(ship, ship.position, {
        x: 10,
        y: 0
      });
    })


    Matter.Engine.run(engine);
    Matter.Render.run(render);
  }


  
  render() {
    return (
      <div className="game">
        <div>
          <canvas id="game-canvas"></canvas>
        </div>
      </div>
    );
  }
};

export default GameComponent;