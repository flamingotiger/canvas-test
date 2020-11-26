import Canvas from "../base/Canvas";
import Entity from "../base/Entity";
import DrawRect from "./DrawRect";

export default class DragArea extends Entity {
  constructor(position) {
    super(position);
    this.position = position;
  }

  update() {
    this.position = Canvas.instance.startPosition;
  }

  render(ctx) {
    if (!Canvas.instance.isPressed) {
      return;
    }
    if(DrawRect.instance.isMovement){
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = "#e67839";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(230, 120, 57,0.5)";
    ctx.rect(
      this.position.x,
      this.position.y,
      Canvas.instance.currentPosition.x - this.position.x,
      Canvas.instance.currentPosition.y - this.position.y
    );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
