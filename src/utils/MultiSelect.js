import Rect from "../shapes/Rect";
import Entity from "../base/Entity";
import Point from "../base/Point";
import Vector from "../base/Vector";
import Dimension from "../base/Dimension";
import Canvas from "../base/Canvas";

export default class MultiSelect extends Entity {
  constructor(position) {
    super(position);
    MultiSelect.instance = this;
    this.position = position;
    this.dimension = new Dimension(0, 0);
  }
  update() {
    const minX = Canvas.instance.selectedObjectsMinPosition.x;
    const minY = Canvas.instance.selectedObjectsMinPosition.y;
    const maxX = Canvas.instance.selectedObjectsMaxPosition.x;
    const maxY = Canvas.instance.selectedObjectsMaxPosition.y;
    this.position = new Vector(minX, minY);
    this.dimension = new Dimension(maxX - minX, maxY - minY);
  }
  render(ctx) {
    if (!Canvas.instance.isMultiSelected) {
      return;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e67839";
    ctx.fillStyle = "rgba(0,0,0,0)";
    new Rect(this.position, this.dimension).render(ctx);

    const { x, y } = this.position;
    const { w, h } = this.dimension;
    Point.drawRectPoint(ctx, x, y, w, h);
    ctx.closePath();
  }
}
