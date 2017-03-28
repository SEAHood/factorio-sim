module Base {

    export class Main {
        private p5Instance : p5;
        private cells = [];
        private cursor : Cursor;
        private ui = null;

        constructor() {
            this.p5Instance = new p5(this.sketch(), 'container');
            this.cursor = new Cursor();
        }

        private sketch() {
            return ( p : p5 ) => {
                p.setup = () => this.setup(p);
                p.draw = () => this.draw(p);
                p.keyPressed = () => this.keyPressed(p);
            }
        }

        private setup( p : p5 ) {
            var width = 1000,
                height = 700;

            p.createCanvas(width, height);

            for ( var i = 0; i < width; i+=20 ) {
                for ( var j = 0; j < height; j+=20 ) {
                    this.cells.push(new Cell(i, j));
                }
            }

            this.ui = new UI(width, height);

            $('body').on('contextmenu', 'canvas', function(e){ return false; });
        }

        private color : number = 50;
        private draw( p : p5 ) {
            p.background(this.color);

            for ( var i = 0; i < this.cells.length; i++ ) {
                this.cells[i].draw(p);
            }
            this.ui.draw(p);
        }

        private keyPressed( p : p5 ) {
            console.log("yes");
            if ( p.keyCode === 82 ) {
                _.each( this.cells, (c : Cell) => {
                    if ( c.isMouseAbove(p.mouseX, p.mouseY) ) {
                        c.rotate();
                    }
                })
            }
        }

    }

    new Main();

}
