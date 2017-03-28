/**
 * Created by Sam on 27/03/2017.
 */
module Base {

    import Color = p5.Color;

    export class Cursor {

        private x : number;
        private y : number;
        private width : number;

        private centerX : number;
        private centerY : number;

        private currentCell : Cell;

        private rotation = Rotation.UP;
        //private type = CellType.EMPTY;


        constructor() {
            this.centerX = 0;
            this.centerY = 0;
            this.width = 20;
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

        public draw(p : p5) {
            p.noStroke();

            if ( this.isMouseAbove(p.mouseX, p.mouseY) ) {
                if (p.mouseIsPressed && p.mouseButton == 'left') {
                    this.type = CellType.BELT;
                }

                if (p.mouseIsPressed && p.mouseButton == 'right') {
                    this.type = CellType.EMPTY;
                }

                p.stroke(p.color(0, 255, 0));
                p.strokeWeight(2);
            }

            let colour : Color;
            switch (this.type) {
                case CellType.EMPTY:
                    colour = p.color(255, 0);
                    break;
                case CellType.BELT:
                    colour = p.color(255,255,100);
                    break;
                default:
                    break;
            }

            p.fill(colour);
            p.rect(this.x, this.y, 20, 20);

            switch ( this.type ) {
                case CellType.BELT:
                    p.push();
                    p.noStroke();
                    //ellipse(this.x, this.y, 3);
                    p.fill(20);
                    p.translate(this.x + 10, this.y + 10);
                    p.rotate(this.getRotationRadians());
                    p.triangle(
                        0, -5,
                        -4, 5,
                        4, 5
                    );
                    p.pop();
                    break;
                default:
                    break;
            }

        }

    }
}