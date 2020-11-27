import Rect from "../shapes/Rect";
import Dimension from "./Dimension";
import Shape from "./Shape";
import Vector from "./Vector";

export default class Point extends Shape {
  dimension = new Dimension(10, 10);
  constructor(position, dimension) {
    super(position, dimension);
    this.x = position.x - this.dimension.w / 2;
    this.y = position.y - this.dimension.h / 2;
  }

  static drawRectPoint(ctx, x, y, w, h) {
    for (let i = 0; i < 4; i++) {
      const points = [
        new Vector(x, y),
        new Vector(x + w, y),
        new Vector(x, y + h),
        new Vector(x + w, y + h),
      ];
      new Point(points[i]).render(ctx);
    }
  }

  update() {}
  render(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#e67839";
    new Rect(new Vector(this.x, this.y), this.dimension).render(ctx);
    ctx.closePath();
  }
}
