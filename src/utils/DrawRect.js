import Rect from "../shapes/Rect";
import Entity from "../base/Entity";
import Point from "../base/Point";
import Vector from "../base/Vector";
import Canvas from "../base/Canvas";
import Time from "../base/Time";

function drawPoint(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#e67839";
  for (let i = 0; i < 4; i++) {
    const points = [
      new Vector(x, y),
      new Vector(x + w, y),
      new Vector(x, y + h),
      new Vector(x + w, y + h),
    ];
    new Point(points[i]).render(ctx);
  }
  ctx.closePath();
}

export default class DrawRect extends Entity {
  isSelected = false;
  isMovement = false;
  targetPosition = new Vector(0, 0);
count = 0;
  constructor(position, dimension) {
    super(position);
    DrawRect.instance = this;
    this.position = position;
    this.dimension = dimension;
  }
  update() {
    if (this.isSelected && this.isMovement) {
      const { currentPosition, startPosition, movementPosition } = Canvas.instance;
      const dx = currentPosition.x - startPosition.x;
      const dy = currentPosition.y - startPosition.y;
      // this.position.x += movementPosition.x;
      // this.position.y += movementPosition.y;
      if (this.position.x <= 1 || this.position.y <= 1) {
        this.movement = false;
      }
    }
  }
  render(ctx) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e67839";
    ctx.fillStyle = "rgba(0,0,0,0)";
    new Rect(this.position, this.dimension).render(ctx);

    if (this.isSelected) {
      ctx.beginPath();
      drawPoint(
        ctx,
        this.position.x,
        this.position.y,
        this.dimension.w,
        this.dimension.h
      );
      ctx.closePath();
    }
  }
}
