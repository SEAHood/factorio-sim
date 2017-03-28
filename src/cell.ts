module Base {

    import Color = p5.Color;
    export enum CellType {
        EMPTY,
        BELT
    }
    export enum Rotation {
        UP,
        RIGHT,
        DOWN,
        LEFT,
    }

    export class Cell {

        private p5 : p5;
        private x : number;
        private y : number;
        private width : number;

        private selected : boolean;

        private rotation = Rotation.UP;
        private type = CellType.EMPTY;


        constructor(x : number, y : number) {
            this.x = x;
            this.y = y;
            this.width = 20;
        }


        private animate() {
            let p5 = this.p5;
            this.selected = false;

            if ( this.isMouseAbove(p5.mouseX, p5.mouseY) ) {
                if (p5.mouseIsPressed && p5.mouseButton == 'left') {
                    this.type = CellType.BELT;
                }

                if (p5.mouseIsPressed && p5.mouseButton == 'right') {
                    this.type = CellType.EMPTY;
                }

                this.selected = true;
            }
        }

        public draw(p5 : p5) {
            this.p5 = p5;

            this.animate();

            p5.noStroke();

            let colour : Color;
            switch (this.type) {
                case CellType.EMPTY:
                    colour = p5.color(255, 0);
                    break;
                case CellType.BELT:
                    colour = p5.color(255,255,100);
                    break;
                default:
                    break;
            }

            p5.fill(colour);
            p5.rect(this.x, this.y, 20, 20);

            switch ( this.type ) {
                case CellType.BELT:
                    p5.push();
                    p5.noStroke();
                    //ellipse(this.x, this.y, 3);
                    p5.fill(20);
                    p5.translate(this.x + 10, this.y + 10);
                    p5.rotate(this.getRotationRadians());
                    p5.triangle(
                        0, -5,
                        -4, 5,
                        4, 5
                    );
                    p5.pop();
                    break;
                default:
                    break;
            }

            if ( this.selected ) {
                this.drawCursor();
            }

        }

        public drawCursor() {
            let p5 = this.p5;
            p5.stroke( p5.color(0, 255, 0) );
            p5.rect(this.x, this.y, 20, 20);

            p5.push();
            p5.translate(this.x + 10, this.y + 10);
            p5.rotate(this.getRotationRadians());
            p5.triangle(
                0, -5,
                -4, 5,
                4, 5
            );
            p5.pop();
        }

        public isMouseAbove(mouseX : number, mouseY : number) : boolean {
            var xIntersect = false,
                yIntersect = false;

            if (mouseX > this.x && mouseX < this.x + this.width) {
                xIntersect = true;
            }

            if (mouseY > this.y && mouseY < this.y + this.width) {
                yIntersect = true;
            }

            return xIntersect && yIntersect;
        }

        public rotate() {
            switch ( this.rotation ) {
                case Rotation.UP:
                    this.rotation = Rotation.RIGHT;
                    break;
                case Rotation.RIGHT:
                    this.rotation = Rotation.DOWN;
                    break;
                case Rotation.DOWN:
                    this.rotation = Rotation.LEFT;
                    break;
                case Rotation.LEFT:
                    this.rotation = Rotation.UP;
                    break;
                default:
                    this.rotation = Rotation.UP;
                    break;
            }
        }

        private getRotationRadians() : number {
            switch ( this.rotation ) {
                case Rotation.UP:
                    return 0;
                case Rotation.RIGHT:
                    return Math.PI / 2;
                case Rotation.DOWN:
                    return Math.PI;
                case Rotation.LEFT:
                    return (3*Math.PI) / 2;
                default:
                    return 0;
            }
        }

    }
}