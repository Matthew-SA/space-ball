import key from "keymaster";

class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.ship = this.game.addShip();
    }

    bindKeyHandlers() {
        const ship = this.ship;
        key('w', () => ship.power(0.2))
        key('s', () => ship.power(-0.2))
        key('a', () => ship.turn(-Math.PI / 16));
        key('d', () => ship.turn(Math.PI / 16));
        // Object.keys(GameView.MOVES).forEach((k) => {
        //     const move = GameView.MOVES[k];
        //     key(k, () => { ship.power(move); });
        // });
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        // start the animations
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }
}

// GameView.MOVES = {
//     w: [0, -1],
//     a: [-1, 0],
//     s: [0, 1],
//     d: [1, 0],
// };

export default GameView;