import Shape from "../base/Shape";

export default class Rect extends Shape {
  constructor(position, dimension) {
    super(position, dimension);
    this.x = position.x;
    this.y = position.y;
    this.w = dimension.w;
    this.h = dimension.h;
  }

  update(delta) {}

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
