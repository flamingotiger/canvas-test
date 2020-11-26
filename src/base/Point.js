import Rect from "../shapes/Rect";
import Shape from "./Shape";
import Dimension from "./Dimension";
import Vector from "./Vector";

export default class Point extends Shape {
  dimension = new Dimension(6, 6);
  constructor(position, dimension) {
    super(position, dimension);
    this.x = position.x - this.dimension.w / 2;
    this.y = position.y - this.dimension.h / 2;
  }
  update() {}
  render(ctx) {
    new Rect(new Vector(this.x, this.y), this.dimension).render(ctx);
  }
}
