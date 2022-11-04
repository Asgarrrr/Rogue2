import Renderer from "./renderer";
import Keyboard from "./keyboard";

/**
 * GameLoop
 * @class
 */
class GameLoop {

    constructor( ) {

        this.rAF            = null;
        this.now            = null;
        this.dt             = null;
        this.last           = null;
        this.accumulator    = 0;
        this.fps            = 60;
        this.delta          = 1e3 / this.fps;
        this.step           = 1 / this.fps;
        this.update         = null;
        this.render         = null;

    }

    clear() {

        Renderer.display.context.clearRect(
            0,
            0,
            Renderer.display.canvas.width,
            Renderer.display.canvas.height
        );

    }

    frame() {

        this.rAF    = requestAnimationFrame( ( ) => this.frame( ) );
        this.now    = performance.now();
        this.dt     = this.now - this.last;
        this.last   = this.now

        // Prevent updating the game with a very large dt if the game were to lose focus and then regain focus later
        if ( this.dt > 1e3 )
            return;

        this.accumulator += this.dt;

        while (this.accumulator >= this.delta) {
            this.update(this.step);
            this.accumulator -= this.delta;
        }

        this.clear();
        this.render();


    }

    start() {
        this.last = performance.now();
        requestAnimationFrame( ( ) => this.frame( ) );
    }

    stop() {
        cancelAnimationFrame( this.rAF );
    }

    init({ update, render }) {
        this.update = update;
        this.render = render;
        Keyboard.init();
    }
}

export default new GameLoop();