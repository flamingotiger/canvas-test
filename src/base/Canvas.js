import Time from "./Time";
import EntityManager from "./EntityManager";
import Vector from "./Vector";
import DrawRect from "../utils/DrawRect";

export default class Canvas {
  isPressed = false;
  startPosition = new Vector(0, 0);
  currentPosition = new Vector(0, 0);
  endPosition = new Vector(0, 0);
  movementPosition = new Vector(0, 0);
  selectedObjects = [];

  constructor(ref) {
    Canvas.instance = this;
    this.canvas = ref;
    this.canvas.width = this.canvas.scrollWidth;
    this.canvas.height = this.canvas.scrollHeight;
    this.ctx = this.canvas.getContext("2d");
    this.entityManager = new EntityManager();
  }

  onMouseDown = (e) => {
    this.isPressed = true;
    this.startPosition = new Vector(e.offsetX, e.offsetY);

    for (let i = 0; i < this.selectedObjects.length; i++) {
      this.selectedObjects[i].isMovement = true;
    }
  };

  onMouseMove = (e) => {
    this.movementPosition = new Vector(e.movementX, e.movementY);
    this.currentPosition = new Vector(e.offsetX, e.offsetY);
  };

  onMouseUp = (e) => {
    this.isPressed = false;
    this.endPosition = new Vector(e.offsetX, e.offsetY);

    const startX = Math.min(this.startPosition.x, this.endPosition.x);
    const endX = Math.max(this.startPosition.x, this.endPosition.x);

    const startY = Math.min(this.startPosition.y, this.endPosition.y);
    const endY = Math.max(this.startPosition.y, this.endPosition.y);

    const objects = this.entityManager.entities.filter(
      (entity) => entity instanceof DrawRect
    );
    this.selectedObjects = objects.filter((entity) => {
      const { x, y } = entity.position;
      const { w, h } = entity.dimension;
      const topLeft = x >= startX && x <= endX && y >= startY && y <= endY,
        topCenter = x <= startX && x + w >= endX && y >= startY && y <= endY,
        topRight = x + w >= startX && x + w <= endX && y >= startY && y <= endY,
        middleLeft =
          x >= startX &&
          x <= endX &&
          y <= startY &&
          y <= endY &&
          y + h >= startY &&
          y + h >= endY,
        middleCenter =
          x <= startX &&
          x <= endX &&
          x + w >= endX &&
          x + w >= startX &&
          y <= startY &&
          y <= endY &&
          y + h >= startY &&
          y + h >= endY,
        middleRight =
          x + w >= startX &&
          x + w <= endX &&
          y <= startY &&
          y <= endY &&
          y + h >= startY &&
          y + h >= endY,
        buttomLeft =
          x >= startX && x <= endX && y + h >= startY && y + h <= endY,
        buttomCenter =
          x <= startX && x + w >= endX && y + h >= startY && y + h <= endY,
        buttomRight =
          x + w >= startX && x + w <= endX && y + h >= startY && y + h <= endY;

      return (
        topLeft ||
        topCenter ||
        topRight ||
        middleLeft ||
        middleCenter ||
        middleRight ||
        buttomLeft ||
        buttomCenter ||
        buttomRight
      );
    });

    for (let i = 0; i < objects.length; i++) {
      objects[i].isSelected = false;
    }

    for (let i = 0; i < this.selectedObjects.length; i++) {
      this.selectedObjects[i].isSelected = true;
      this.selectedObjects[i].isMovement = false;
    }
  };

  play = () => {
    Time.start();
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.handleRequestFrame = window.requestAnimationFrame(this.onEnterFrame);
  };

  pause = () => {
    if (this.handleRequestFrame === null) {
      return;
    }
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    window.cancelAnimationFrame(this.handleRequestFrame);
  };

  onEnterFrame = () => {
    Time.update();
    this.entityManager.update();
    this.entityManager.render(this.ctx);
    this.handleRequestFrame = window.requestAnimationFrame(this.onEnterFrame);
  };
}
