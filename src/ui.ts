module Base {

    export class UI {

        private canvasWidth;
        private canvasHeight;

        private toolbarWidth = 300;
        private toolbarHeight = 50;

        private toolbarSlots = [];
        private toolbarSlotWidth = 50;
        private toolbarSlotHeight = 50;

        constructor(cWidth : number, cHeight : number) {
            this.canvasHeight = cHeight;
            this.canvasWidth = cWidth;
        }

        public draw(p : p5) {
            p.noStroke();
            p.fill(p.color(50));
            p.rect(
                (this.canvasWidth / 2) - (this.toolbarWidth / 2),
                this.canvasHeight - this.toolbarHeight,
                this.toolbarWidth,
                this.toolbarHeight
            );

            var slotCount = this.toolbarWidth / this.toolbarSlotWidth;
            for (var i = 0; i < slotCount; i++) {
                p.noStroke();

                var xIntersect = false,
                    yIntersect = false;

                var slotX = (((this.canvasWidth / 2) - (this.toolbarWidth / 2)) + (i * this.toolbarSlotWidth) + 3);
                var slotY = this.canvasHeight - this.toolbarHeight + 3;
                var slotW = this.toolbarSlotWidth - 6;
                var slotH = this.toolbarSlotHeight - 6;

                if (p.mouseX > slotX && p.mouseX < slotX + slotW) {
                    xIntersect = true;
                }
                if (p.mouseY > slotY && p.mouseY < slotY + slotH) {
                    yIntersect = true;
                }
                if (xIntersect && yIntersect) {
                    //stroke(color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255) ));
                    p.stroke(p.color(0, 255, 0));
                    p.strokeWeight(2);
                }

                p.fill(p.color(150));
                p.rect(
                    slotX,
                    slotY,
                    slotW,
                    slotH
                );
            }
        }
    }

}