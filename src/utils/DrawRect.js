import Rect from "../shapes/Rect";
import Entity from "../base/Entity";
import Point from "../base/Point";
import Vector from "../base/Vector";
import Canvas from "../base/Canvas";

export default class DrawRect extends Entity {
  isSelected = false;
  isMovement = false;
  targetPosition = new Vector(0, 0);

  constructor(position, dimension) {
    super(position);
    DrawRect.instance = this;
    this.position = position;
    this.dimension = dimension;
  }
  update() {}
  render(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.fillStyle = `rgba(100,100,200,0.5)`;
    new Rect(this.position, this.dimension).render(ctx);

    if (this.isSelected && !Canvas.instance.isMultiSelected) {
      Point.drawPoint(
        ctx,
        this.position.x,
        this.position.y,
        this.dimension.w,
        this.dimension.h
      );
    }
    ctx.closePath();
  }
}
